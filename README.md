# Rating Service
A web-server (with HTTP APIs) that handles all tasks required for a rating service.

-----
# Steps to run:
1. Install Node.js version ```8.9.1```
2. Install MongoDB Community Server edition version ```3.3.5```.
3. On command line type ```mongo``` and hit enter. (Will run Mongo on its default port ```27017```)
4. On command line type ```redis-server``` and hit enter. (Will run Redis on its default port ```6379```)
5. Go to root directory of *rating-service* project.
6. On command line type ```npm install``` and hit enter.
7. On command line type ```npm start``` and hit enter.
- Yay! 🎉 our server is up and running on default port ```3000```.
- Go through below docs, to understand the ```Entities``` and supported ```API```'s.
- Optional: You can also run test cases by ```npm test```.

-----

# Architecture 
![alt text](https://raw.githubusercontent.com/impiyush83/rating-service/master/architecture.png)


## Assumptions

- We have assumed that the response for getting a rating of any product would be count of all the ratings (i.e onestar, twostar .... fivestar).
- This is a similar example of any other rating service such as in  google play etc. 
- No auth service is developed, it is assumed that user is logged in. 
- To know which user is hitting the API we are adding userId for the post request in ProductRating API.
- Every *user can rate a unique product only once*. 
- Every user has rented each and every product.


## Explanation

- As per the, rating service it is should be  read-heavy than compared to writes. At peak times, if a  product a trending the writes can be heavy. 
-  We will focus on retrieval of ratings. Hence, as it is **read heavy**. We are using Redis for caching the product ratings into the **redisStore**.
- The cache strategy can be multiple ways like cache aside, write through, read through. But we have chose, *CRON* jobs to minimize writes and reads, but we traded consistency for the period of time between CRON job. We achieve eventual consistency as CRON jobs will update the redis in the near future. 
-  Also among all the NOSQL DB's we have chosen *MongoDB* document data store, because it provides atomicity at the document level & is strongly consistent (providing CP of the CAP theorem).

----

## Entities:

- User, Product, Ratings are the 3 collections formed. We have separated out Ratings Schema by which the document size of product and  user wont exceed the max limit 16MB if number of ratings increase. 
-  The  productId  and UserId are  *String Type* Because in JS (as most of our web clients would be in JS) the Number cannot go beyond **9007199254740991**. So we don't want to limit the number of records in our table by mere **JS language's data type limitation**! That's why all id's are choosen to be of *String* data type.

---

## Schema 

- Used https://github.com/arb/celebrate for schema validation.
- Ratings Schema

    ```
    userId: String. Field is required.
    productId: String. Field is required.
    rating: String, Field is required. Enum data  [
                Constants.RATING.TYPE.ONESTAR,
                Constants.RATING.TYPE.TWOSTAR,
                Constants.RATING.TYPE.FOURSTAR,
                Constants.RATING.TYPE.THREESTAR,
                Constants.RATING.TYPE.FIVESTAR
            ]
    ```

---

# API

## API Documentation link: 
https://documenter.getpostman.com/view/4946631/SWE57z5z?version=latest

### User API 

**1.  Add User API**
    
- API: ```localhost:3000/user```
- HTTP method: POST
- Adds new user in the DB

    ```
    Example using cURL

    curl --location --request POST "{{url}}/user" \
    --header "Content-Type: application/json" \
    --data "{
	\"userId\": \"abdc\",
	\"userName\": \"Piyush Nalawade\"
    }"  

    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": "Success"
    }   
    ```

    ```
    Success response
    Status code: 409 Conflict
    
    {
        "success": false
    }   
    ```

**2. Add Product API**
    
- API: ```localhost:3000/product```
- HTTP method: POST
- Adds new Product into the DB
    ```
    Example using cURL

    curl --location --request POST "http://127.0.0.1:3000/product" \
    --header "Content-Type: application/json" \
    --data "{
	\"productId\": \"abc\",
	\"productName\": \"Sofa\"
    }"

    ```
    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": "Success"
    }   
    ```

    ```
    Success response
    Status code: 409 Conflict
    
    {
        "success": false
    }   
    ```
**3. Adds ProductRating API**
    
- API: ```localhost:3000/product/:productId/ratings```
- HTTP method: POST
- Adds new Product rating into the DB
    ```
    Example using cURL

   curl --location --request POST "{{url}}/product/2/ratings" \
    --header "Content-Type: application/json" \
    --data "{
	\"userId\": \"1\",
	\"rating\": \"FIVESTAR\"
    }"

    ```

    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": "Success"
    }   
    ```
    ```
    Success response
    Status code: 409 Conflict
    
    {
        "success": false
    }   
    ```

**4. Get ProductRating API**
    
- API: ```localhost:3000/product/:productId/ratings```
- HTTP method: GET
- Gets Product rating of a product 99% from Redis, just uses MongoDb  when  keys not present into the redis.
    
    ```
    Example using cURL

    curl --location --request GET "{{url}}/product/1/ratings"

    ```

    ```
    Success response
    Status code: 200 OK
    
    {
        "success": true,
        "message": "Success",
        "rating": {
            "fiveStar": 9,
            "fourStar": 0,
            "threeStar": 0,
            "twoStar": 0,
            "oneStar": 1,
            "averageRating": 4.6
        }
    }
    ```

