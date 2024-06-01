<?php

namespace App\Exports;

use App\Models\Supplier;
use App\Models\User;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Events\BeforeSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SupplierExport implements FromQuery, WithMapping, WithColumnFormatting, ShouldAutoSize, WithStyles, WithHeadings, WithDefaultStyles, WithEvents, WithColumnWidths
{

    use Exportable, RegistersEventListeners;
    protected $user, $date, $filter;

    public function __construct(User $user, array $filters)
    {
        $this->user = $user;
        $this->filter = $filters['search'] ?? '';
    }

    public function query()
    {
        $suppliers = Supplier::where('user_id', $this->user->id);

        return $suppliers
            ->when(
                $this->filter ?? false,
                function ($query, $value) {
                    $query->where('name', 'like', '%' . $value . '%')
                        ->orWhere('document', 'like', '%' . $value . '%')
                        ->orWhere('address', 'like', '%' . $value . '%')
                        ->orWhere('phone', 'like', '%' . $value . '%')
                        ->orWhere('email', 'like', '%' . $value . '%');
                }
            );
    }

    public function map($supplier): array
    {
        return [
            Date::dateTimeToExcel($supplier->created_at),
            $supplier->name,
            $supplier->document,
            $supplier->address,
            $supplier->phone,
            $supplier->email,
        ];
    }

    public function columnFormats(): array
    {
        return [
            'A' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }

    public function columnWidths(): array
    {
        return [
            'D' => 38,
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

    public static function beforeSheet(BeforeSheet $event)
    {
        $sheet = $event->sheet->getDelegate();
        $pageSetup = $sheet->getPageSetup();
        $pageMargins = $sheet->getPageMargins();
        $pageSetup->setOrientation(PageSetup::ORIENTATION_LANDSCAPE);
        $pageSetup->setFitToWidth(1);
        $pageSetup->setFitToHeight(0);
        $pageMargins->setTop(0.25);
        $pageMargins->setRight(0.25);
        $pageMargins->setLeft(0.25);
        $pageMargins->setBottom(0.25);
    }

    public function registerEvents(): array
    {
        return [
            BeforeSheet::class => [self::class, 'beforeSheet'],
        ];
    }

    public function headings(): array
    {
        return [
            'Data',
            'Nome',
            'CNPJ',
            'Endereço',
            'Telefone',
            'E-mail',
        ];
    }
}
