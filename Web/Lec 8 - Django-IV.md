## **Backend Python + Django Course | Lecture 8** 

## **Lecture 8** 

## **Models, Database, Migrations, and Admin** 

_Django turns Python classes into database-powered web applications._ 

**==> picture [300 x 220] intentionally omitted <==**

**----- Start of picture text -----**<br>
DB<br>Model<br>Admin<br>Panel<br>**----- End of picture text -----**<br>


Faculty of Computers & AI 

**Goals** 

## **Backend Python + Django Course | Lecture 8** 

## **Learning Objectives** 

_What students should be able to do by the end of the lecture_ 

**1. Define what a Django model is and why it matters** 

**3. Create fields and choose correct data types** 

**5. Register models in the admin panel** 

## **2. Map Python classes to database tables** 

**4. Understand migrations and their workflow** 

**6. Create, read, update, and delete data conceptually** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Quick Recap** 

_How today connects to previous lectures_ 

## **Lecture 5** 

## **Lecture 6** 

## **Lecture 7** 

- Created a Django project 

- 

- Ran development server 

- 

- Understood settings and structure 

- • 

- Created apps Rendered templates 

- 

   - 

- • 

- Connected URLs Passed context 

- • 

- • • Wrote views and Built dynamic HTML responses pages 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Today's Roadmap** 

**==> picture [875 x 357] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 2 3 4 5 6<br>Why  Field types  Relationships  Admin panel<br>What a model  Migrations<br>databases  and model  between  and hands-on<br>is workflow<br>matter design models practice<br>**----- End of picture text -----**<br>


Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Why Do We Need a Database?** 

_Persistence means data survives after the program stops_ 

## **Without** 

- Variables live only while the program is running 

- A database keeps data for tomorrow, next week, and next semester 

- Multiple users can access the same stored information 

- Searching, filtering, and updating become easier 

## **Database** 

```
student_list = ["Ali", "Mona"]
# Data disappears after
restart
```

## **With** 

## **Database** 

Students table keeps records permanently Name | Level | Department 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Memory vs Database** 

_Temporary storage is not enough for web applications_ 

## **Program Memory** 

- Fast and temporary 

- Lost when server restarts 

- Good for current processing 

- Not shared as permanent records 

## **Database Storage** 

- Persistent and structured 

- Survives restart 

- Shared by users and system parts 

- Supports queries, relations, and history 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **What Is a Django Model?** 

_A model is a Python class that describes stored data_ 

- Written as a Python class 

- Usually inherits from models.Model 

- Each attribute becomes a database field 

   - `1 from django.db import models 2` 

   - `3 class Student(models.Model):` 

   - `4 name = models.CharField(max_length=100) 5 level = models.IntegerField()` 

- Each object becomes one row in the table 

**Python class** ➜ **database table** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Model = Blueprint for Data** 

**==> picture [869 x 343] intentionally omitted <==**

**----- Start of picture text -----**<br>
Student Table<br>id One Row =<br>Class 1<br>name Ali One<br>Student level<br>2 Object<br>depart<br>CS<br>ment<br>**----- End of picture text -----**<br>


Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **First Model Example** 

_A simple Student model_ 

- Import models from django.db 

- Inherit from models.Model 

- Define fields with types and options 

- Add __str__ for readable display 

```
1 fromdjango.db importmodels
2
3 classStudent(models.Model):
4 name =models.CharField(max_length=100)
5 age =models.IntegerField()
6 department =models.CharField(max_length=50)
7
8 def__str__(self):
9 returnself.name
```

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Class-to-Table Mapping** 

_Translate each programming concept into database language_ 

> **Django Code Database Meaning** 

> `class Student(models.Model)` **Table** 

> `name = models.CharField(...)` **Column** 

> `Student(name="Ali")` **Object / Row data** 

> `__str__ method` **Readable display only** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Default Database in Django** 

_SQLite is ready to use for learning and small projects_ 

- No extra installation in most setups 

## **settings.py** 

- Stored as a local file (db.sqlite3) 

- Perfect for classroom demos and prototypes 

- Easy to start, but not always ideal for large production systems 

- `1 DATABASES = {` 

- `2 'default': { 3 'ENGINE': 'django.db.backends.sqlite3', 4 'NAME': BASE_DIR / 'db.sqlite3', 5 } 6 }` 

Result: a local database file inside the project folder. 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Other Databases You May Hear About** 

**SQLite** Excellent for learning and small local projects **PostgreSQL** Popular choice for serious Django production projects **MySQL** Widely used in many web systems **Oracle /** Less common in beginner courses but possible **Others For this course: SQLite is enough.** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Where Do Models Live?** 

_Models are usually written inside models.py of an app_ 

## **Project** 

## **Structure** 

```
myproject/
├── manage.py
├── myproject/
└── students/
```

```
├── admin.py
├── apps.py
├── models.py   ← here
├── views.py
└── migrations/
```

- Each Django app can own its models 

- Keep related data together inside the same app 

- Example: students app contains Student model 

- Later, admin.py often imports models from models.py 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Writing a Model Step by Step** 

_From import to field definitions_ 

- Open the app folder 

- Go to models.py 

- Import models 

- Write class Student(models.Model) 

- Add fields one by one 

   - `1 # students/models.py` 

   - `2 from django.db import models 3` 

   - `4 class Student(models.Model):` 

   - `5 name = models.CharField(max_length=100) 6 level = models.IntegerField() 7 department = models.CharField(max_length=50)` 

- Save the file before migrations 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Why Inherit from models.Model?** 

- It tells Django this class should be managed as a database model 

- Django adds many features automatically 

- The class gets ORM abilities such as save(), delete(), objects 

- Without it, the class is just a normal Python class 

**==> picture [378 x 191] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 # Normal Python class<br>2 class Student:<br>3  pass<br>4<br>5 # Django model<br>6 class Student(models.Model):<br>7  pass<br>**----- End of picture text -----**<br>


**Inheritance gives the class database behavior.** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Common Field Types in Django** 

**CharField BooleanField** Short text such as name or department True / False values **TextField DateField / DateTimeField** Long text such as description or notes Dates and timestamps **IntegerField EmailField** Whole numbers such as level or age Email input with suitable meaning 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **CharField** 

_Use it for short text with max_length_ 

- Good for names, codes, titles, departments 

- 

   - `1 name = models.CharField(max_length=100)` 

   - `2 code = models.CharField(max_length=10) 3 department = models.CharField(max_length=50)` 

- Requires max_length 

- 

- Stored as short text in the database 

- 

- Often one of the most common fields 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **TextField, IntegerField, and DateTimeField** 

- • • 

- TextField for large text IntegerField for whole DateTimeField for date + 

- • numbers time 

- • • • Example: description, notes • Example: age, level, • Example: created_at, 

- • credit hours updated_at 

- • • • Usually no max_length • • 

- requirement Use numeric meaning, Useful for tracking not text records 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Primary Key and id Field** 

- Django automatically adds an id field unless you define your own primary key 

- The id uniquely identifies each row 

- Primary keys prevent ambiguity between records 

- 

## **Student** 

## **Table** 

```
id    name    level
```

```
1     Ali     2
```

```
2     Mona    2
```

   - `3     Omar    1` 

- Usually you will see values like 1, 2, 3, 4... 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

**Why __str__ Matters** _Readable display in admin and shell_ 

- Returns a human-friendly text representation 

- Improves object display in admin panel 

- Does not create a database column 

   - `1 class Student(models.Model): 2 name = models.CharField(max_length=100) 3 4 def __str__(self): 5 return self.name` 

- Often returns name or title 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Important Field Options** 

_null, blank, and default_ 

- **null=True blank=True default=** 

- • • • Database can store Field can be empty in Provides automatic NULL forms initial value 

- • • • Mostly about database Mostly about validation Useful when field level level should not be empty 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **What Are Migrations?** 

_Migrations are versioned instructions for database changes_ 

**==> picture [864 x 343] intentionally omitted <==**

**----- Start of picture text -----**<br>
Change<br>Create  Apply to<br>model<br>database<br>migration file<br>code<br>Think of migrations as a history of database structure changes.<br>**----- End of picture text -----**<br>


Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Migration Workflow** 

**==> picture [875 x 357] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 2 3 4 5<br>python  python<br>Review migration  Database is<br>Edit model code manage.py  manage.py<br>file updated<br>makemigrations migrate<br>**----- End of picture text -----**<br>


Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **makemigrations** 

_Creates migration files based on model changes_ 

- Compares current models with previous migration state 

   - `1 python manage.py makemigrations` 

- Generates Python migration files inside migrations folder 

- Does not change the database yet 

- Useful to inspect what Django understood 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **migrate** 

_Applies pending migrations to the database_ 

- Reads migration files in order 

   - `1 python manage.py migrate` 

- Creates or alters database tables 

- Updates Django's migration history 

- Must be run whenever structure changes 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Helpful Migration Commands** 

**`python manage.py showmigrations`** Shows which migrations are applied 

- showmigrations helps debug which steps have run 

- sqlmigrate helps advanced learners see the SQL behind Django ORM 

**`python manage.py sqlmigrate students 0001`** Shows the SQL generated for a migration 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Common Migration Problems** 

- Changed model but forgot migrate 

- **Added non-null field to existing table without default** 

- Edited old migration files carelessly 

- Database and migration history got out of sync 

**Rule of thumb: change models carefully, then create and apply migrations immediately.** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

**Modifying an Existing Model** _Add a new field, then migrate again_ 

- Edit the model code 

- Run makemigrations 

- Run migrate 

```
1 classStudent(models.Model):
2 name =models.CharField(max_length=100)
3 level =models.IntegerField()
4 email =models.EmailField(blank=True)
```

- Repeat this pattern whenever the structure changes 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Design Decisions: Required or Optional?** 

- Required fields make sense for essential information 

- Optional fields fit less critical information 

- `1 department =` 

```
models.CharField(max_length=50)
2 email =models.EmailField(blank=True)
3 level =models.IntegerField(default=1)
```

- Defaults reduce repetitive input 

- Think about the real business rule before coding 

**Ask: which fields are truly mandatory in a student record?** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Relationships Between Models** 

_Real systems have connected data, not isolated tables_ 

## **Student Course Instructor Department** 

- A student belongs to a department 

- A course may have many students 

- A profile may belong to exactly one student 

- Relationships are critical in backend design 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **ForeignKey** 

_Many objects point to one related object_ 

- Common for many-to-one relationships 

- Example: many students belong to one department 

- Stored as a reference to another table row 

- Very common in Django apps 

- `1 class Department(models.Model): 2 name = models.CharField(max_length=100) 3` 

- `4 class Student(models.Model):` 

- `5 name = models.CharField(max_length=100) 6 department = models.ForeignKey(Department, on_delete=models.CASCADE)` 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **OneToOneField** 

_Exactly one related object for exactly one main object_ 

- Good for profile details or extension tables 

- Example: one student has one ID card record 

- Separates optional or extra data from main table 

- Each side maps to one record 

- `1 class Student(models.Model): 2 name = models.CharField(max_length=100) 3` 

- `4 class StudentProfile(models.Model): 5 student = models.OneToOneField(Student, on_delete=models.CASCADE)` 

- `6 address = models.CharField(max_length=200) 7 phone = models.CharField(max_length=20)` 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **ManyToManyField** 

_Many records on both sides of the relationship_ 

- A student can take many courses 

- A course can include many students 

- Django creates an intermediate table automatically 

- Excellent for registration-like systems 

- `1 class Course(models.Model): 2 title = models.CharField(max_length=100)` 

```
3
```

- `4 class Student(models.Model):` 

- `5 name = models.CharField(max_length=100) 6 courses = models.ManyToManyField(Course)` 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Relationship Diagram Example** 

**Student Department Course** One department → many Many students many students courses 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Django ORM: Talking to the Database with Python** 

- ORM = Object Relational Mapper 

- 

- Lets us work with Python objects instead of writing raw SQL all the time 

- `1 Student.objects.create(name='Ali', level=2)` 

- `2 Student.objects.filter(level=2)` 

- `3 Student.objects.get(id=1)` 

• 

- Creates, reads, updates, and deletes data 

- 

- Understands model relationships 

**Python code** ➜ **SQL behind the scenes** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Create Data with ORM** 

_Insert new rows into the database_ 

- Use .create(...) for quick creation 

- 

- Or create object then save() 

- 

- Field names must match model fields 

```
1 Student.objects.create(name='Ali',level=2,
department='CS')
2
```

   - `3 # another style` 

   - `4 student = Student(name='Mona', level=1, department='AI') 5 student.save()` 

- 

- Creates a new row in the related table 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

**Read Data: all() and filter()** _Retrieve records from the database_ 

- all() returns all records 

- 

   - `1 Student.objects.all()` 

   - `2 Student.objects.filter(level=2)` 

   - `3 Student.objects.filter(department='CS')` 

- filter() returns matching records only 

- 

- Results can be displayed in views and templates 

- 

- Filtering is essential in real applications 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Read One Record with get()** 

_Use get() when you expect exactly one object_ 

- Often used with id or unique fields 

- 

   - `1 student = Student.objects.get(id=1)` 

   - `2 print(student.name)` 

- Raises an error if no record or multiple records match 

- 

- Suitable when fetching a single detail page 

Faculty of Computers & AI 

**Backend Python + Django Course | Lecture 8** 

## **Update Data** 

_Modify existing records then save again_ 

- Fetch the object first 

- 

   - `1 student = Student.objects.get(id=1)` 

   - `2 student.level = 3` 

   - `3 student.department = 'IS'` 

- Change one or more fields 

   - `4 student.save()` 

- 

- Call save() to persist changes 

- 

- Very common in forms and admin editing 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Delete Data** 

_Remove a record from the database_ 

- Fetch the object first 

- 

   - `1 student = Student.objects.get(id=3)` 

   - `2 student.delete()` 

- Call delete() 

- 

- Use carefully because data may be lost 

- 

- Admin panel also supports deletion 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **What Is Django Admin?** 

_A built-in management interface for your models_ 

- Comes with Django out of the box 

- 

- Lets admins add, edit, and delete records 

- 

- Excellent for testing and internal management tools 

**Imagine a ready-made dashboard for your models and tables.** 

- 

- Saves time during development 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Register a Model in admin.py** 

_Without registration, the model will not appear_ 

- Import the model in admin.py 

- 

- Use admin.site.register(ModelName) 

   - `1 from django.contrib import admin 2 from .models import Student 3` 

   - `4 admin.site.register(Student)` 

- 

- Then open the admin panel after migrations 

- 

- Simple but essential step 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Create a Superuser** 

_You need an admin account to log in_ 

- Run the command from the terminal 

   - `1 python manage.py createsuperuser` 

- 

- Enter username, email, and password 

- 

- Use this account to access /admin 

- 

- Keep credentials safe 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Customize Admin with ModelAdmin** 

_Improve the list screen in admin_ 

- Create a custom admin class 

- 

   - `1 from django.contrib import admin` 

   - `2 from .models import Student` 

   - `3` 

- Use list_display to show important columns 

- 

- Use search_fields and list_filter for productivity 

- 

   - `4 @admin.register(Student)` 

   - `5 class StudentAdmin(admin.ModelAdmin): 6 list_display = ('id', 'name', 'level', 'department')` 

   - `7 search_fields = ('name', 'department') 8 list_filter = ('level', 'department')` 

- Admin becomes more usable with a few lines 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Typical Admin Workflow** 

## **1. Login to /admin** 

## **2. Open Student model** 

## **3. Click Add** 

## **4. Fill fields** 

## **5. Save record** 

## **6. Edit or delete later** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Using choices for Controlled Values** 

_Restrict field values to known options_ 

- Useful for gender, status, level, semester, etc. 

• 

- Improves consistency of stored data 

- 

- Often shown as dropdown in forms/admin 

## `1 LEVEL_CHOICES = [` 

   - `2 (1, 'Level 1'), 3 (2, 'Level 2'), 4 (3, 'Level 3'), 5 (4, 'Level 4'), 6 ] 7 8 level = models.IntegerField(choices=LEVEL_CHOICES)` 

- 

- Prevents random text variations 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

**Timestamps and Ordering** _Useful metadata for real systems_ 

- created_at stores when record was created 

- 

- `1 created_at =` 

```
models.DateTimeField(auto_now_add=True)
```

   - `2 updated_at = models.DateTimeField(auto_now=True)` 

- updated_at stores latest modification time 

- 

- ordering in Meta controls default sorting 

   - `3` 

   - `4 class Meta:` 

   - `5 ordering = ['name']` 

- 

- Very useful in admin and query results 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Mini Project Design** 

_Student + Course + Department_ 

**==> picture [768 x 126] intentionally omitted <==**

**----- Start of picture text -----**<br>
Student Course<br>Departm<br>ent name,  title,<br>level code<br>name<br>Foreign ManyToM<br>Key any<br>**----- End of picture text -----**<br>


- Students belong to one department 

- 

- Students can register in many courses 

- 

- Courses can contain many students 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Practice 1 – Choose the Correct Field Type** 

Students **student name** answer Students **student age** answer Students **course description** answer Students **email** answer Students **created time** answer **Ask learners to answer: CharField? IntegerField? TextField? EmailField? DateTimeField?** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Practice 2 – Design a Course Model** 

## **Possible** 

- Ask students to propose fields for a Course model 

## • 

- Possible ideas: title, code, credit_hours, description 

- 

- Ask which fields are required and which are optional 

## **Answer** 

- `1 class Course(models.Model): 2 title = models.CharField(max_length=100) 3 code =` 

```
models.CharField(max_length=10)
```

- `4 credit_hours = models.IntegerField() 5 description =` 

```
models.TextField(blank=True)
```

## • 

- Ask whether any choices or relationships are needed 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Quick Quiz 1** 

## **What does python manage.py makemigrations do?** 

A. Deletes all tables B. Creates migration files based on model changes **Expected answer: B** C. Opens the admin panel D. Creates a superuser 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Quick Quiz 2** 

## **Which relationship fits: one student can take many courses, and one course can have many students?** 

A. ForeignKey B. OneToOneField C. ManyToManyField D. CharField 

**Expected answer: C** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Lecture Recap** 

_The six big ideas to leave with_ 

**1. Models describe data with Python classes** 

**3. Migrations sync model changes with the database** 

**5. ORM lets us use Python to work with data** 

**2. Fields map to database columns** 

**4. Relationships connect tables logically** 

**6. Admin gives a ready-made management interface** 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Homework** 

- Create a Department model and a Student model 

- Connect Student to Department using ForeignKey 

- Register both models in admin.py 

- Run makemigrations and migrate 

- Create a superuser and add at least 3 departments and 5 students from the admin panel 

- Write down which field types you used and why 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Preview of Lecture 9** 

_Forms and CRUD Operations_ 

- How users submit data using forms 

- 

- How backend receives and validates form data 

- 

**Today we created the data structure. Next lecture, users will interact with it.** 

- How to build create, read, update, and delete pages 

- 

- Connecting forms to models and templates 

Faculty of Computers & AI 

## **Backend Python + Django Course | Lecture 8** 

## **Questions and Discussion** 

## **Ask anything about models, migrations, database logic, or admin workflow.** 

## Suggested prompts: 

   - What was the most confusing point today? 

- Which command do you want to practice again? 

• Which relationship still needs clarification? 

Faculty of Computers & AI 

