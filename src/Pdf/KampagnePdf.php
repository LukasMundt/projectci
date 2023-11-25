<?php

namespace Lukasmundt\ProjectCI\Pdf;

use setasign\Fpdi\TcpdfFpdi;
use Illuminate\Support\Facades\View;

class KampagnePdf extends TcpdfFpdi
{
    public function Header()
    {
        $this->setY(10);
        $this->setFont('dejavusans');
        $this->image('C:\Users\lukas\Downloads\Logo.png', 125, 10, 0, 20);
        // Title
        // $this->Cell(0, 15, '<< TCPDF Example 003 >>', 0, false, 'C', 0, '', 0, false, 'M', 'M');
    }
    public function Footer()
    {
        $this->setY(-20);
        $this->SetFont('dejavusans');
        $style = array(
            'border' => 0,
            'vpadding' => 'auto',
            'hpadding' => 'auto',
            'fgcolor' => array(0, 0, 0),
            'bgcolor' => false,
            //array(255,255,255)
            'module_width' => 1,
            // width of a single module in points
            'module_height' => 1 // height of a single module in points
        );
        // $this->write2DBarcode('lumos.example.de/s/13rteqay31b7o9s3a5pge1e3f5', 'QRCODE,Q', 5, 278, 15, 15, $style);
        $this->writeHTML(View::make(
            'projectci::pdf.serienbrief.footer',
            [
                'footer' => '',
            ])->render());
    }
}