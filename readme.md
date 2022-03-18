<div id='top-document'/>


# My Money App
My Money API is a *family budget control system*. It can registry income and expenses and generate a monthly statement report.

It was made during the Alura Backend Challenge week. Alura is a Brazilian online learning platform. Each week they provide a Trello board with instructions of what the client wants, and we could choose any technology to tackle this challenge.

I have choose working with Javascript, using Nodejs framework and a few libraries such as express and date-fns. For the database, I really enjoy working with MongoDB.

It stills under development. Next steps: fix status code of some of the requests; make e2e tests, probably using jest, or native Nodejs test runner.

This documentation was made using the [doc-maker cli](https://github.com/cesargos/cli-doc-maker) that takes Postman doc and transforms to a readme.md for github.


<br><br>


* [1. Income Entry](#1)
* [2. Get Income List](#2)
* [3. Get Income by ID](#3)
* [4. Get Income by Month](#4)
* [5. Update Income](#5)
* [6. Delete Income](#6)
* [7. Expenses Entry](#7)
* [8. Get Expenses List](#8)
* [9. Get Expenses by ID](#9)
* [10. Get Expenses by Month](#10)
* [11. Update Expenses](#11)
* [12. Delete Expenses](#12)
* [13. Month Statement](#13)


<br><br><br>

## Authorization method


For all requests: Basic Auth

<br><br>


<div id='1' />


## 1. Income Entry
**Endpoint:** `{{baseUrl}}/income`

**Method:** POST

**Description:** Register an income entry specifying user's name, income description, amount and date.

**Body Params Type:** raw

### Body Params Description
``` 
 {
    "user": "String: username",
    "description": "String: income description",
    "amount": "Number: income amount",
    "date": "String: date format yyyy-MM-dd"
}
```
<details>
<summary>Body example</summary>


``` json
 {
  "user": "Tatiana",
  "description": "Selling",
  "amount": 5000,
  "date": "2023-02-15"
}
```
</details>



## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "user": "Tatiana",
        "description": "Selling",
        "amount": 2500,
        "date": "2023-02-15T00:00:00.000Z",
        "_id": "6225e11893e3a04739b6ee4c",
        "__v": 0
    }
}
```


</details>



<details>
<summary>400 - Already registered entry</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "This entry has been registered already."
}
```


</details>



<details>
<summary>400 - Missing params</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "ValidationError: description: Path `description` is required."
}
```


</details>



<details>
<summary>400 - Wrong date format</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "Date format is not accepted, please use yyyy-MM-dd format"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='2' />


## 2. Get Income List
**Endpoint:** `{{baseUrl}}/income`

**Method:** GET

**Description:** Get the full income list.



## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": [
        {
            "description": "Freelance",
            "amount": 2000,
            "date": "2022-01-25T00:00:00.000Z"
        },
        {
            "description": "Personal store",
            "amount": 1500,
            "date": "2022-01-15T00:00:00.000Z"
        },
        {
            "description": "Salary",
            "amount": 5000,
            "date": "2022-01-30T00:00:00.000Z"
        },
        {
            "description": "Salary",
            "amount": 5000,
            "date": "2022-02-15T00:00:00.000Z"
        },
        {
            "description": "Salary",
            "amount": 5000,
            "date": "2023-02-15T00:00:00.000Z"
        }
    ]
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='3' />


## 3. Get Income by ID
**Endpoint:** `{{baseUrl}}/income/:id`

**Method:** GET

**Description:** Get an income with the specified ID.




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "description": "Selling",
        "amount": 2500,
        "date": "2023-02-15T00:00:00.000Z"
    }
}
```


</details>



<details>
<summary>400 - Income ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no income with ID 61eee874a4fdb4818c452143"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='4' />


## 4. Get Income by Month
**Endpoint:** `{{baseUrl}}/income/:year/:month`

**Method:** GET

**Description:** Get all income of the same month and same year.




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": [
        {
            "description": "Freelance",
            "amount": 2000,
            "date": "2022-01-25T00:00:00.000Z"
        },
        {
            "description": "Personal store",
            "amount": 1500,
            "date": "2022-01-15T00:00:00.000Z"
        },
        {
            "description": "Salary",
            "amount": 5000,
            "date": "2022-01-30T00:00:00.000Z"
        }
    ]
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='5' />


## 5. Update Income
**Endpoint:** `{{baseUrl}}/income/:id`

**Method:** PUT

**Description:** Update an income specifying an ID.

**Body Params Type:** raw

### Body Params Description
``` 
 {
    "user": "String: username",
    "description": "String: income description",
    "amount": "Number: income amount",
    "date": "String: date format yyyy-MM-dd"
}
```
<details>
<summary>Body example</summary>


``` json
 {
  "user": "Tatiana",
  "description": "job in mountain",
  "amount": 500,
  "date": "2022-02-18"
}
```
</details>




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "_id": "6225e11893e3a04739b6ee4c",
        "user": "Tatiana",
        "description": "job in mountain",
        "amount": 500,
        "date": "2022-02-18T00:00:00.000Z",
        "__v": 0
    }
}
```


</details>



<details>
<summary>400 - Income ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no income with ID 61f04d20b3b1b7c28faba40d"
}
```


</details>



<details>
<summary>400 - Missing params</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "ValidationError: amount: Path `amount` is required."
}
```


</details>



<details>
<summary>400 - Wrong date format</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "Cast to date failed for value \"18/01/2022\" (type string) at path \"date\" for model \"income\""
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='6' />


## 6. Delete Income
**Endpoint:** `{{baseUrl}}/income/:id`

**Method:** DELETE

**Description:** Delete and income entry specifying and ID.




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "message": "Successfully delete."
}
```


</details>



<details>
<summary>400 - Income ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no income with ID 61f044116d13142e55fb1f31"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='7' />


## 7. Expenses Entry
**Endpoint:** `{{baseUrl}}/expenses`

**Method:** POST

**Description:** Register an expense entry specifying user's name, income description, amount and date.

Optional it can be passes a category. If not specified, it will be attributed "Outras".

### Query Params
Param|Obrigatório|Description
---|---|---
category|No| Accept: 'Alimentação', 'Saúde', 'Moradia', 'Transporte', 'Educação', 'Lazer', 'Imprevistos', 'Outras'


**Body Params Type:** raw

### Body Params Description
``` 
 {
    "user": "String: username",
    "description": "String: income description",
    "amount": "Number: income amount",
    "date": "String: date format yyyy-MM-dd"
}
```
<details>
<summary>Body example</summary>


``` json
 {
  "user": "String: username",
  "description": "String: income description",
  "amount": "Number: income amount",
  "date": "String: date format yyyy-MM-dd"
}
```
</details>




## Request examples
<details>
<summary>400 - Already registered entry</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "This entry has been registered already."
}
```


</details>



<details>
<summary>200 - Success (without specified category)</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "user": "Tatiana",
        "description": "Mercado",
        "amount": 400,
        "date": "2022-03-01T00:00:00.000Z",
        "category": "Outras",
        "_id": "622b55066a4e9e13fbe8640f",
        "__v": 0
    }
}
```


</details>



<details>
<summary>200 - Success (with specified category)</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "user": "Tatiana",
        "description": "Mercado 2",
        "amount": 400,
        "date": "2022-03-01T00:00:00.000Z",
        "category": "Alimentação",
        "_id": "622b56116a4e9e13fbe86413",
        "__v": 0
    }
}
```


</details>



<details>
<summary>400 - Missing Params</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "ValidationError: description: Path `description` is required."
}
```


</details>



<details>
<summary>400 - Wrong date format</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "Date format is not accepted, please use yyyy-MM-dd format"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='8' />


## 8. Get Expenses List
**Endpoint:** `{{baseUrl}}/expenses`

**Method:** GET

### Query Params
Param|Obrigatório|Description
---|---|---
description|No|




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": [
        {
            "description": "Mercado",
            "amount": 1000,
            "date": "2022-01-04T00:00:00.000Z"
        },
        {
            "description": "Farmácia",
            "amount": 1000,
            "date": "2022-01-04T00:00:00.000Z"
        },
        {
            "description": "Aluguel",
            "amount": 500,
            "date": "2022-01-04T00:00:00.000Z"
        },
        {
            "description": "Carro",
            "amount": 200,
            "date": "2022-01-04T00:00:00.000Z"
        },
        {
            "description": "Shopping",
            "amount": 400,
            "date": "2022-01-04T00:00:00.000Z"
        },
        {
            "description": "Carro",
            "amount": 400,
            "date": "2022-02-01T00:00:00.000Z"
        },
        {
            "description": "Moto",
            "amount": 200,
            "date": "2022-02-01T00:00:00.000Z"
        },
        {
            "description": "Moto",
            "amount": 200,
            "date": "2022-01-01T00:00:00.000Z"
        },
        {
            "description": "Carro",
            "amount": 400,
            "date": "2022-03-01T00:00:00.000Z"
        },
        {
            "description": "Mercado",
            "amount": 400,
            "date": "2022-03-01T00:00:00.000Z"
        },
        {
            "description": "Mercado 2",
            "amount": 400,
            "date": "2022-03-01T00:00:00.000Z"
        }
    ]
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='9' />


## 9. Get Expenses by ID
**Endpoint:** `{{baseUrl}}/expenses/:id`

**Method:** GET




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "description": "Mercado",
        "amount": 400,
        "date": "2022-03-01T00:00:00.000Z"
    }
}
```


</details>



<details>
<summary>400 - Expense ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no expenses with ID 622b55066a4e9e13fbe86405"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='10' />


## 10. Get Expenses by Month
**Endpoint:** `{{baseUrl}}/expenses/:year/:month`

**Method:** GET




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": [
        {
            "description": "Carro",
            "amount": 400,
            "date": "2022-02-01T00:00:00.000Z"
        },
        {
            "description": "Moto",
            "amount": 200,
            "date": "2022-02-01T00:00:00.000Z"
        }
    ]
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='11' />


## 11. Update Expenses
**Endpoint:** `{{baseUrl}}/expenses/:id`

**Method:** PUT

**Body Params Type:** raw

### Body Params Description
``` 
 {
    "user": "String: username",
    "description": "String: income description",
    "amount": "Number: income amount",
    "date": "String: date format yyyy-MM-dd"
}
```
<details>
<summary>Body example</summary>


``` json
 {
  "user": "Tatiana",
  "description": "lala",
  "date": "2022-02-14"
}
```
</details>




## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "_id": "622b55066a4e9e13fbe8640f",
        "user": "Tatiana",
        "description": "shopping",
        "amount": 500,
        "date": "2022-02-14T00:00:00.000Z",
        "category": "Outras",
        "__v": 0
    }
}
```


</details>



<details>
<summary>400 - Expense ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no expenses with ID 622b55066a4e9e13fbe8640a"
}
```


</details>



<details>
<summary>400 - Missing params</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "ValidationError: amount: Path `amount` is required."
}
```


</details>



<details>
<summary>400 -Wrong date format</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "Date format is not accepted, please use yyyy-MM-dd format"
}
```


</details>



<details>
<summary>400 - Alredy updated</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "This entry has been registered already."
}
```


</details>



<details>
<summary>Update Expenses</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no expenses with ID 622b55066a4e9e13fbe8640a"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='12' />


## 12. Delete Expenses
**Endpoint:** `{{baseUrl}}/expenses/:id`

**Method:** DELETE



## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "message": "Successfully delete."
}
```


</details>



<details>
<summary>400 - Expense ID not found</summary>



**Status:** Bad Request - **Code:** 400


``` 
 {
    "status_code": 400,
    "error": "There is no expenses with ID 622b55066a4e9e13fbe8640a"
}
```


</details>




[> Back to top <](#top-document)

<br><br>




<div id='13' />


## 13. Month Statement
**Endpoint:** `{{baseUrl}}/statement/:year/:month`

**Method:** GET



## Request examples
<details>
<summary>200 - Success</summary>



**Status:** OK - **Code:** 200


``` 
 {
    "status_code": 200,
    "data": {
        "totalIncome": 5000,
        "totalExpenses": 600,
        "monthBalance": 4400,
        "categoryExpenses": [
            {
                "category": "Alimentação",
                "total": 0
            },
            {
                "category": "Saúde",
                "total": 0
            },
            {
                "category": "Moradia",
                "total": 0
            },
            {
                "category": "Transporte",
                "total": 200
            },
            {
                "category": "Educação",
                "total": 0
            },
            {
                "category": "Lazer",
                "total": 0
            },
            {
                "category": "Imprevistos",
                "total": 0
            },
            {
                "category": "Outras",
                "total": 400
            }
        ]
    }
}
```


</details>




[> Back to top <](#top-document)

<br><br>

