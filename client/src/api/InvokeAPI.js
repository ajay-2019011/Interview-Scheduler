class InvokeAPI
{
    static async get(url)
    {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        try
        {
            var response = await fetch(url, requestOptions)
            response = await response.text()
            response = JSON.parse(response)

            return response;
        }
        catch(err)
        {
            return "Error Occured"
        }
    }

    static async post(url, body = {})
    {
        var myHeaders = new Headers()

        myHeaders.append("Content-Type", "application/json");
        var raw  = JSON.stringify(body)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        try
        {
            var response = await fetch(url, requestOptions)
            response = await response.text()
            response = JSON.parse(response)

            return response
        }
        catch(err)
        {
            return "Error Occured"
        }
    }
}

module.exports = InvokeAPI