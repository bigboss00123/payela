import requests

def send_c2b_payment(customer_msisdn, amount, transaction_reference='T12344C', third_party_reference='111PA2D', service_provider_code='171717'):
    url = 'http://localhost:5001/c2b'
    payload = {
        'CustomerMSISDN': customer_msisdn,
        'Amount': amount,
        'TransactionReference': transaction_reference,
        'ThirdPartyReference': third_party_reference,
        'ServiceProviderCode': service_provider_code
    }
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print('Response status code:', response.status_code)
        print('Response JSON:', response.json())
    except requests.exceptions.RequestException as e:
        print('Request failed:', e)

if __name__ == '__main__':
    # Example usage
    send_c2b_payment('258843550143', 2)