<?php

namespace App\Exports;

use App\Models\Historic;
use App\Models\User;
use Carbon\Carbon;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class HistoricExport implements FromQuery, WithMapping, WithColumnFormatting, ShouldAutoSize, WithStyles, WithHeadings, WithDefaultStyles
{

    use Exportable;
    protected $user, $date, $filter;

    public function __construct(User $user, array $filters)
    {
        $this->user = $user;
        $this->date = $filters['date'] ?? '';
        $this->filter = $filters['search'] ?? '';
    }

    public function query()
    {
        $historics = Historic::where('user_id', $this->user->id);

        return $historics
            ->when(
                $this->filter ?? false,
                function ($query, $value) {
                    $query->where('type', 'like', '%' . $value . '%')
                        ->orWhereHas('product', function ($query) use ($value) {
                            $query->where('name', 'like', '%' . $value . '%');
                        })
                        ->orWhereHas('supplier', function ($query) use ($value) {
                            $query->where('name', 'like', '%' . $value . '%');
                        });
                }
            )
            ->when(
                $this->date ?? false,
                function ($query, $date) {
                    $formattedDate = Carbon::parse($date)->format('Y-m-d');
                    $query->whereDate('created_at', $formattedDate);
                }
            );
    }

    public function map($historic): array
    {
        return [
            Date::dateTimeToExcel($historic->created_at),
            $historic->type,
            $historic->quantity,
            $historic->product->name,
            $historic->description,
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function defaultStyles(Style $defaultStyle)
    {
        return [
            'font' => [
                'name' => 'Arial',
                'bold' => false,
                'italic' => false,
                'underline' => false,
                'strikethrough' => false,
                'color' => [
                    'rgb' => '000000'
                ]
            ],
            'borders' => [
                'bottom' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ],
                'top' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ]
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
                'wrapText' => true,
            ],
            'quotePrefix' => true
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'ffffff']
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['rgb' => '000000'],
                ],
            ],
        ];
    }

    public function headings(): array
    {
        return [
            'Data',
            'Tipo de movimentação',
            'Quantidade',
            'Produto',
            'Descrição',
        ];
    }
}
