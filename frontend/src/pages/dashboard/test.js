import { triggerMobilePayment } from 'backend/payments.jsw';
import wixLocation from 'wix-location';

$w.onReady(function () {
  // Esconder mensagem de erro inicialmente
  $w('#errorText').hide();

  $w('#payNowButton').onClick(async () => {
    // Reset mensagem de erro
    $w('#errorText').hide();
    $w('#errorText').text = "";

    // Pegar valores dos inputs
    const name = $w('#nameInput').value;
    const email = $w('#emailInput').value;
    const whatsapp = $w('#whatsappInput').value;
    const paymentNumber = $w('#paymentNumberInput').value;

    // Verificação de campos vazios
    if (!name || !email || !whatsapp || !paymentNumber) {
      $w('#errorText').text = "⚠️ Preencha todos os campos antes de continuar.";
      $w('#errorText').show();
      return;
    }

    // Detectar o meio de pagamento
    let meio = "";
    if (paymentNumber.startsWith("84") || paymentNumber.startsWith("85")) {
      meio = "mpesa";
    } else if (paymentNumber.startsWith("86") || paymentNumber.startsWith("87")) {
      meio = "emola";
    } else {
      $w('#errorText').text = "❌ Número inválido. Use M-Pesa (84/85) ou e-Mola (86/87).";
      $w('#errorText').show();
      return;
    }

    // Mudar o botão para "A processar..."
    $w('#payNowButton').label = "A processar...";
    $w('#payNowButton').style.backgroundColor = "#999999";
    $w('#payNowButton').disable();

  try {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Tempo limite excedido")), 60000)
  );

  const result = await Promise.race([
    triggerMobilePayment({
      carteira: "1742133609268x308312739691364350",
      numero: paymentNumber,
      nome: name,
      valor: 1,
      meio_de_pagamento: meio
    }),
    timeout
  ]);

  console.log("📦 MozPayment Response:", result);



  if (result.success === "success") {
    wixLocation.to("https://www.osegredopremium.com/obrigado");
  } else {
    $w('#errorText').text = "❌ Pagamento falhou. Verifique seu número e tente novamente.";
    $w('#errorText').show();
          $w('#payNowButton').label = "Efetuar Pagamento";
      $w('#payNowButton').style.backgroundColor = "#FDBA12";
      $w('#payNowButton').enable();
    
  }

} catch (error) {
  console.error("❌ Erro na requisição:", error);
  $w('#errorText').text = "❌ Erro de conexão ou tempo limite excedido. Verifique sua internet e tente novamente.";
  $w('#errorText').show();

$w('#payNowButton').label = "Efetuar Pagamento";
$w('#payNowButton').style.backgroundColor = "#FDBA12";
$w('#payNowButton').enable();
  
}
  });
});