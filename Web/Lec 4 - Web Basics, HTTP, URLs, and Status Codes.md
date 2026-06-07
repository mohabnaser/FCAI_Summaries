1 

## **Lecture 4 Web Basics, HTTP, URLs, and Status Codes** 

_Backend Python + Django Course Second Year - Faculty of Computers & AI_ 

## **Dr. Mohamed Nour Eldien** 

## **Lecture Focus** 

How a browser talks to a server, how URLs are built, and how HTTP responses are interpreted. 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

2 

## **Learning Outcomes** 

_By the end of this lecture, students should be able to explain the full basic web flow_ 

- Define client, server, request, and response. 

- Read and analyze a URL into parts. 

- Differentiate common HTTP methods such as GET and POST. 

- Interpret major HTTP status code groups. 

- Relate forms, browsers, and backend validation to real web applications. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

3 

## **What Happens When You Open a Website?** 

_A simple everyday question with a very important backend answer_ 

- You type a URL or click a link. 

- The browser sends a request over the network. 

- A server receives the request and processes it. 

- The server returns a response. 

- The browser displays the result as a web page or data. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

4 

## **Client and Server** 

_Two sides of every web conversation_ 

- The client is usually the browser or mobile 

   - app. 

- The server is the machine or service that listens and responds. 

- The client asks; the server answers. 

- A web application is built around this repeated conversation. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

5 

## **Frontend, Backend, and Database** 

_The three parts students must keep separate in their minds_ 

- Frontend: what the user sees and interacts 

   - with. 

- Backend: logic, validation, permissions, and processing. 

- Database: persistent storage for application data. 

- These parts cooperate, but each has a different responsibility. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

6 

## **What Does the Browser Do?** 

_Browser responsibilities on the client side_ 

- Shows HTML, CSS, and JavaScript to the user. 

- Collects user input from buttons and forms. 

- Sends requests to servers. 

- Receives responses and renders them. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

7 

## **What Does the Backend Server Do?** 

_The server is where the hidden work happens_ 

- Receives incoming requests. 

- Runs business logic and validation. 

- Communicates with the database if needed. 

- Returns the correct response: page, JSON, redirect, or error message. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

8 

## **Role of the Database** 

_The memory of the web application_ 

- Stores data permanently. 

- Keeps tables such as students, courses, and grades. 

- Allows searching, updating, inserting, and deleting records. 

- The backend uses it; the browser does not talk to it directly in our basic model. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

9 

## **Static vs Dynamic Websites** 

_Why backend exists in the first place_ 

- Static website: same content for every visitor. 

- Dynamic website: content changes based on user, data, or action. 

- University portals, e-commerce, and dashboards are dynamic. 

- Dynamic sites need backend logic and often a database. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

10 

## **The Journey of One Web Request** 

_A request moves through many steps before the user sees a result_ 

- User action: click, submit, or enter URL. 

- Browser creates and sends a request. 

- Server receives and processes. 

- Database may be read or updated. 

- Server sends response back to browser. 

- Browser renders the result. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

11 

## **What Is a URL?** 

_Uniform Resource Locator - the address of a web resource_ 

- A URL tells the browser where to go. 

- It can point to a page, image, API endpoint, or file. 

- It includes meaningful parts such as protocol, domain, and path. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

12 

## **Parts of a URL** 

_Every section of a URL carries information_ 

- Protocol: http or https 

- Domain: example.com 

- Port: optional, such as 8000 

- Path: /students/list 

- Query string: ?level=2&sort=name 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

13 

## **Example URL Analysis** 

_Read the URL exactly like a backend developer_ 

- https://portal.cu.edu.eg:443/students/profile? id=25 

- https -> secure protocol 

- portal.cu.edu.eg -> domain 

- 443 -> port 

- /students/profile -> path 

- ?id=25 -> query parameter 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

14 

## **Path vs Query String** 

_Two very common URL components with different meanings_ 

- The path identifies the general resource or 

   - route. 

- The query string adds extra details or filters. 

- Example path: /courses/list 

- Example query: ?department=CS&level=2 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

15 

## **What Is HTTP?** 

_The language used by browsers and web servers_ 

- HTTP stands for HyperText Transfer Protocol. 

- It defines how requests and responses are structured. 

- It does not decide your business logic; it defines the communication format. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

16 

## **Request: The Message Sent by the Client** 

_A request asks the server to do something or provide something_ 

- Contains a method such as GET or POST. 

- Contains a target URL or path. 

- May contain headers. 

- May contain a body with sent data. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

17 

## **Response: The Message Sent by the Server** 

_The response tells the client what happened_ 

- Contains a status code such as 200 or 404. 

- Contains headers that describe the response. 

- Contains a body: HTML, JSON, file, or error 

   - text. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

18 

## **Headers and Body** 

_Two parts that appear in both requests and responses_ 

- Headers provide metadata: content type, authorization, length, and more. 

- Body carries the actual data when needed. 

- Not every request needs a body. 

- Many responses do include a body. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

19 

## **HTTP Methods Overview** 

_The method tells the server the intention of the request_ 

- GET -> read data or page 

- POST -> send new data 

- PUT/PATCH -> update existing data 

- DELETE -> remove data 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

20 

## **GET Method** 

_Used to retrieve a page or data without creating a new record_ 

- Common for opening pages and reading lists. 

- Usually parameters are visible in the URL. 

- Should not be used to create sensitive updates in normal design. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

21 

## **POST Method** 

_Used to send data that the server should process or store_ 

- Common with forms such as login, registration, and create record. 

- Data is sent in the request body. 

- Used when a new action or new record is required. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

22 

## **PUT and PATCH** 

_Methods often associated with updating existing data_ 

- PUT often means replace the resource fully. 

- PATCH often means update only part of it. 

- In beginner web apps, the exact usage may be hidden by forms or frameworks, but the idea matters. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

23 

## **DELETE Method** 

_Used when the client asks the server to remove a resource_ 

- Represents deleting data on the server side. 

- Should be protected by authorization and validation. 

- A delete action should not be triggered carelessly by a simple public link. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

24 

## **Safe and Idempotent - Simplified View** 

_Two useful ideas when thinking about HTTP behavior_ 

- GET is usually treated as safe because it should only read. 

- Idempotent means repeating the same request should have the same effect. 

- DELETE is often idempotent conceptually, even if the first call removes the data. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

25 

## **HTML Forms and Backend Requests** 

_Forms are a common bridge between the user and the server_ 

- A form collects user input. 

- The form sends data to a target URL. 

- The method is usually GET or POST in basic HTML forms. 

- The backend receives the data and acts on it. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

26 

## **Example: Login Form Flow** 

_A practical sequence students already know well_ 

- User enters email and password. 

- Browser sends POST request to login endpoint. 

- Server validates user credentials. 

- Server returns success, failure, or redirect. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

27 

## **Why Backend Validation Is Necessary** 

_Never trust input just because it came from a nice form_ 

- Frontend validation improves user experience. 

- Backend validation protects data integrity and security. 

- The server must re-check required fields, formats, and permissions. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

28 

## **What Is JSON?** 

_A common format for sending structured data_ 

- JSON is text-based structured data. 

- Common in APIs and modern web apps. 

- Uses key-value pairs and arrays. 

- Python can easily read and write JSON. 

**==> picture [412 x 203] intentionally omitted <==**

**----- Start of picture text -----**<br>
JSON Example<br>1 {<br>2  "name": "Ali",<br>3  "level": 2,<br>4  "department": "CS"<br>5 }<br>**----- End of picture text -----**<br>


Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

29 

## **What Is an API?** 

_A contract for communicating with software through requests and responses_ 

- API stands for Application Programming Interface. 

- A web API often returns data instead of full rendered pages. 

- The same HTTP principles still apply: URL, method, headers, body, response. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

30 

## **Browser Developer Tools - Network Thinking** 

_A backend developer should learn to observe requests and responses_ 

- Open browser developer tools. 

- Use the Network tab to see requests. 

- Observe method, status code, and timing. 

- This is useful for debugging web applications. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

31 

## **HTTP Status Codes - Big Picture** 

_The server uses status codes to summarize the result of a request_ 

- 1xx -> informational 

- 2xx -> success 

- 3xx -> redirection 

- 4xx -> client-side problem 

- 5xx -> server-side problem 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

32 

## **1xx Informational** 

_Rare in beginner daily work, but useful to know exists_ 

- This family is for informational responses. 

- It is not the main focus in beginner backend 

   - courses. 

- Know that not every response means final success or final failure immediately. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

33 

## **2xx Success Codes** 

_The server accepted the request successfully_ 

- 200 OK -> successful general response. 

- 201 Created -> a new resource was created. 

- 204 No Content -> success but no body 

   - returned. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

34 

## **3xx Redirection Codes** 

_The client is told to go somewhere else_ 

- 301 -> moved permanently. 

- 302 -> temporary redirect in many practical contexts. 

- Redirects are common after login or after successful form submission. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

35 

## **4xx Client Error Codes** 

_The request has a problem from the client side perspective_ 

- 400 Bad Request -> malformed or invalid request. 

- 401 Unauthorized -> authentication required. 

- 403 Forbidden -> understood but not allowed. 

- 404 Not Found -> target resource not found. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

36 

## **5xx Server Error Codes** 

_The server failed while handling an apparently valid request_ 

- 500 Internal Server Error -> generic server 

   - failure. 

- 502 Bad Gateway and 503 Service Unavailable may appear in larger deployments. 

- These usually point to backend/server-side issues, not simple wrong URLs. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

37 

## **Real Scenario 1 - Opening a Valid Page** 

_A normal successful browsing case_ 

- User opens /courses/list 

- Server finds the route and prepares data 

- Response usually returns 200 OK 

- Browser renders the page 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

38 

## **Real Scenario 2 - Page Not Found** 

_A classic 404 example_ 

- User opens a wrong or missing path. 

- Server does not find matching route or 

   - resource. 

- Response returns 404 Not Found. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

39 

## **Real Scenario 3 - Forbidden Action** 

_A 403 example based on permissions_ 

- A normal student tries to open an admin-only 

   - page. 

- Server understands the request. 

- Server refuses because permissions are missing. 

- Response can be 403 Forbidden. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

40 

## **Complete Example - Login Request and Response** 

_Connect methods, status codes, validation, and redirect_ 

- User submits login form with POST. 

- Server validates email and password. 

- If successful -> create session and redirect. 

- If failed -> return form again with error 

   - message. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

41 

## **Cookies and Sessions - Intro Only** 

_How the server remembers that a user is logged in_ 

- A cookie is small data stored in the browser. 

- A session represents server-side remembered user state. 

- After login, the server often needs a way to recognize the same user later. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

42 

## **Example - Course Registration Flow** 

_A familiar university case_ 

- Student opens registration page with GET. 

- Student chooses course and submits form with POST. 

- Server checks rules and prerequisites. 

- Database stores registration if valid. 

- Server returns success or error message. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

43 

## **URL Routing - Preview for Django** 

_The backend maps paths to logic_ 

- A route connects a URL path to backend code. 

- Different paths lead to different views or handlers. 

- Later in Django, urls.py will manage this mapping. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

44 

## **HTML Response vs JSON Response** 

_Two common response styles from the backend_ 

- HTML response is meant to be rendered as a page. 

- JSON response is meant to be consumed as data. 

- Traditional Django pages often return HTML. 

## Response Example 

   - `1 HTTP/1.1 200 OK` 

   - `2 Content-Type: application/json` 

   - `3` 

   - `4 {"status": "success"}` 

- APIs often return JSON. 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

45 

## **Local Development Address** 

_Why we often use localhost:8000 in class_ 

- localhost means this same machine. 

- 8000 is a port number commonly used in development. 

- When Django runs locally, the browser talks to your own computer. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

46 

## **Terminal Review for Web Work** 

_Simple commands help us verify tools and move around projects_ 

- python --version 

- pip --version 

- cd project_folder 

- dir or ls to list files 

## Terminal Commands 

- `1 python --version` 

- `2 pip --version` 

- `3 cd backend_project` 

- `4 dir` 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

47 

## **Quick Check: Is Python Ready?** 

_Environment checks before running web code_ 

- Install Python first. 

- Make sure the python command works. 

- Make sure pip works. 

- Use VS Code terminal or system terminal to 

   - test. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

48 

## **A Very Simple Local Server Idea** 

_Even before Django, browsers can talk to a local server conceptually_ 

- A browser needs an address and a listening service. 

- Frameworks like Django make this organized and powerful. 

- The principle remains: request goes in, response comes out. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

49 

## **Common Beginner Mistakes in Web Basics** 

_Confusions that must be fixed early_ 

- Thinking frontend and backend are the same. 

- Using GET when POST is more suitable. 

- Not understanding why 404 and 500 are different. 

- Believing frontend validation alone is enough. 

- Confusing path and query string. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

50 

## **Practice 1 - Classify the Component** 

_Is it frontend, backend, or database?_ 

- Displaying a button -> ? 

- Checking password correctness -> ? 

- Saving a grade record -> ? 

- Showing a success message -> ? 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

51 

## **Practice 2 - Choose the HTTP Method** 

_Select the most suitable method for each action_ 

- Open the students list. 

- Submit login credentials. 

- Update student phone number. 

- Delete a course registration. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

52 

## **Practice 3 - Analyze This URL** 

_Read the address like a professional_ 

- http://localhost:8000/courses/list?level=2&se mester=1 

- Find the protocol. 

- Find the host. 

- Find the port. 

- Find the path. 

- Find the query string. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

53 

## **Practice 4 - Which Status Code Fits?** 

_Match the event with the likely code_ 

- Valid page opened successfully. 

- Requested route does not exist. 

- User is not allowed to access admin page. 

- Unexpected server bug happened. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

54 

## **Mini Quiz 1** 

_Quick oral questions_ 

- What is the difference between a request and a response? 

- What is the difference between path and query string? 

- Why is backend validation necessary even when frontend validation exists? 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

55 

## **Mini Quiz 2** 

_Continue reinforcing the key ideas_ 

- Which method is usually used to open a page? 

- Which code often means page not found? 

- Which component stores data permanently? 

- What does localhost mean? 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

56 

## **Lecture Map - The Whole Story in One View** 

_A mental summary before closing_ 

- URL gives the address. 

- HTTP organizes the conversation. 

- Method gives the intention. 

- Server processes and validates. 

- Status code summarizes the result. 

- Browser shows the final output. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

57 

## **Most Important Takeaways** 

_The ideas students must remember after class_ 

- A web app is a conversation between client and server. 

- Backend is responsible for logic, validation, and data access. 

- GET and POST are not interchangeable. 

- 404 and 500 do not mean the same thing. 

- URL structure matters. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

58 

## **How This Connects to Django** 

_Why today’s lecture is essential before framework work_ 

- Django uses routes for URLs. 

- Django views handle requests and return 

   - responses. 

- Django forms send GET/POST data. 

- Django apps often return 200, 302, 404, and other status codes. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

59 

## **Homework** 

_Short tasks to strengthen understanding before the next lecture_ 

- Write 5 examples of URLs and label their parts. 

- Give 3 examples where GET is suitable and 3 where POST is suitable. 

- Write the meaning of 200, 403, 404, and 500 in your own words. 

- Observe one website using browser developer tools if possible. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

60 

## **Preview of Lecture 5** 

_Next step: starting Django project setup_ 

- What is Django in practice? 

- Installing Django with pip. 

- Creating a Django project. 

- Running the development server. 

- Understanding the project structure. 

**==> picture [425 x 252] intentionally omitted <==**

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

61 

## **Comparing GET and POST Side by Side** 

_Same endpoint idea, different intent_ 

- GET is mainly for reading. 

- POST is mainly for sending data to be processed. 

- GET parameters often appear in the URL. 

- POST data is usually carried in the body. 

## Teaching Example 

```
1 # Example idea
```

- `2 GET  /students/list?page=2` 

- `3 POST /students/create 4` 

- `5 # One reads, one creates` 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

62 

## **401 vs 403 - A Common Source of Confusion** 

_Authentication issue or permission issue?_ 

- 401 often means the system expects authentication. 

- 403 often means identity may be known, but access is denied. 

## Teaching Example 

```
1 401 -> Who are you?
```

```
2 403 -> I know you, but you are not allowed
here.
```

- The exact implementation may differ, but the distinction is useful. 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

63 

## **API Example - JSON Instead of a Full Page** 

_Backend can return data directly_ 

- Request: GET /api/students/1 

- Response body may be JSON. 

- Useful for mobile apps and JavaScript frontends. 

- Same HTTP concepts still apply. 

## Teaching Example 

- `1 {` 

- `2 "id": 1,` 

- `3 "name": "Mona",` 

- `4 "level": 2` 

```
5 }
```

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

64 

## **Why Redirect Happens After Forms** 

_A clean browser experience after submission_ 

- Redirect can move the user to a success page. 

- Redirect can avoid accidental resubmission on refresh. 

## Teaching Example 

   - `1 POST /login  -> success` 

   - `2 302 Redirect -> /dashboard/` 

- Very common after login or successful create action. 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

65 

## **Debugging Question - 404 or 500?** 

_Train yourself to ask the right first question_ 

- If the path is wrong or route missing -> think 404. 

- If the code crashed while processing -> think 500. 

## Teaching Example 

   - `1 Wrong URL?     -> 404` 

   - `2 Code exception? -> 500` 

- Different errors suggest different debugging directions. 

Faculty of Computers & AI - Cairo University 

Backend Python + Django | Lecture 4 

