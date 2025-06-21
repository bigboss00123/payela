import requests

url = "https://mozpayment.co.mz/api/1.1/wf/pagamentorotativompesa"

payload = {
    "carteira": "1742133609268x308312739691364350",
    "numero": "843550143",  
    "quem comprou": "js",
    "valor": '1'
}

try:
  
    response = requests.post(url, json=payload, timeout=30)

    
    response.raise_for_status()

   
    print("Pagamento processado com sucesso:")
    print(response.json())

except requests.Timeout:
    print("Erro: Tempo limite excedido. Nenhuma resposta do servidor.")
except requests.RequestException as e:
    print(f"Erro ao enviar pagamento: {e}")
