<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Etiqueta produto</title>

    <style>
        * {
            margin: 0;
            padding: 0px;
        }

        body {
            height: 100%;
            margin: 5px 5px;
            border: solid 1px #000;
        }

        .product {
            margin: auto;
            padding-top: 10px;
            text-align: center;
            text-transform: uppercase;
        }

        .price {
            margin: auto;
            padding: 5px 0px;
            text-align: center;
            text-transform: uppercase;
            font-weight: 700;
        }

        .barcode {
            margin: auto;
            width: 50%;
        }
    </style>

</head>

<body>
    <div class="product">
        {{ $product->name }}
    </div>
    <div class="price">
        <p>R$ {{ $product->price }}</p>
    </div>
    <div class="barcode">
        {!! $barcode !!}
    </div>
</body>

</html>
