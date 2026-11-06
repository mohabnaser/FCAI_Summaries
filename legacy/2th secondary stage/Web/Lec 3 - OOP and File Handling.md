## **Lecture 3: OOP and File Handling for Backend Development** 

Deeper than Lecture 2 | For second-year FCAI students | English teaching deck 

**Deep lecture deck with detailed explanation, live coding, class activities, and file-based mini tasks.** 

## **Teaching target** 

Students should leave this lecture able to create classes, instantiate objects, explain self, use inheritance, and read/write files confidently. 

## **Dr. Mohamed Nour Eldien** 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend1 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Objectives** 

_By the end of this lecture, students should be able to:_ 

- Explain the purpose of object-oriented programming in Python. 

- Differentiate between class, object, attribute, method, and constructor. 

- Create classes and instantiate multiple objects from the same class. 

- Understand inheritance, overriding, and simple design decisions. 

- Read from and write to files using Python in a safe and organized way. 

- Connect OOP and file handling to backend programming practice. 

**==> picture [360 x 184] intentionally omitted <==**

## **Suggested opening** 

Tell students that this lecture moves from “small scripts” to “organized programs”. That is the bridge to real backend projects. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend2 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Roadmap** 

_Visible structure helps students follow the logic_ 

- Part 1: Why OOP matters in backend systems. 

- Part 2: Classes, objects, attributes, methods, and self. 

- Part 3: Constructors, inheritance, and simple design patterns. 

- Part 4: File handling, paths, errors, JSON, and small data storage. 

- Part 5: Combining OOP and files in a mini backendstyle example. 

**==> picture [360 x 184] intentionally omitted <==**

## **Teaching move** 

Keep pointing back to the roadmap so students can place each detail inside a bigger picture. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend3 

_Bridge from Lecture 2 to Lecture 3_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Before We Start** 

- Last lecture focused on variables, conditions, loops, functions, and simple files. 

- Today we organize code into reusable units called classes. 

- We also learn how programs can save data outside memory using files. 

- Together, these skills help students move toward real applications. 

**==> picture [360 x 184] intentionally omitted <==**

## **How to say it** 

Functions organize actions; classes organize data and actions together. Files preserve data after the program closes. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend4 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 1 - Why OOP for Backend?** 

Students need the reason before the syntax. 

**==> picture [368 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend5 

_Programs grow; structure becomes necessary_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Problem Does OOP Solve?** 

- A tiny script can survive with loose variables and functions. 

- A larger application needs a clearer model of its real entities. 

- Backend systems often deal with users, products, courses, orders, and messages. 

- Object-oriented programming lets us represent such entities more naturally. 

**==> picture [360 x 184] intentionally omitted <==**

## **Real-world framing** 

Ask: if a system stores hundreds of students, should we keep random variables, or should we create a Student model? 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend6 

_The shortest definition that students can remember_ 

**==> picture [960 x 33] intentionally omitted <==**

## **OOP in One Sentence** 

- Object-oriented programming is a way to build programs using classes and objects. 

- A class defines the blueprint. 

- An object is a real instance created from that blueprint. 

- The object holds data and can perform actions through methods. 

**==> picture [360 x 184] intentionally omitted <==**

## **Instructor Note** 

Repeat “blueprint versus instance” several times. This is the key mental model. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend7 

_Link the topic to future Django understanding_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Backend Developers Use OOP** 

- Backend systems model real things: Student, Course, User, Product, Invoice. 

- OOP groups related data and behavior in one place. 

- This improves readability, reuse, testing, and maintenance. 

- Django models themselves are classes, so this lecture prepares students for Django deeply. 

**==> picture [360 x 184] intentionally omitted <==**

## **Strong connection** 

Say clearly: every time you define a Django model later, you are writing a class. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend8 

_Use an example from their own university context_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Real-World Analogy: A Student System** 

- Suppose we want to represent students in a program. 

- Each student has data such as name, level, and department. 

- Each student can also do actions such as display information or update grades. 

- A Student class lets us keep that logic together. 

**==> picture [360 x 184] intentionally omitted <==**

## **Prompt for students** 

Ask them to name other campus entities that can become classes: course, instructor, classroom, lab, timetable. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend9 

**==> picture [960 x 33] intentionally omitted <==**

## **Quick Discussion Task** 

_Practice is where understanding becomes skill_ 

- If you had to design a program for library management, what classes would you create? 

- For each class, mention two attributes and one behavior. 

- Let pairs of students discuss for 2 minutes, then share answers. 

- Write the best answers on the board. 

**==> picture [360 x 194] intentionally omitted <==**

## **Expected Direction** 

The goal is not exact syntax yet. The goal is seeing how software models real-world entities. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend10 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 2 - Class, Object, Attribute, Method** 

This section should move slowly and use repeated examples. 

**==> picture [368 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend11 

_Start from the most basic concept_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Is a Class?** 

- A class is a template or blueprint. 

- It tells Python what data an object should have and what actions it should support. 

- A class does not represent one specific student or one specific course. 

- It represents the general idea of such an entity. 

**==> picture [360 x 184] intentionally omitted <==**

## **Explain carefully** 

The class itself is not “Mona” or “Ali”. It is the general plan used to create many objects. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend12 

_Move from abstract idea to concrete instance_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Is an Object?** 

- An object is a real thing created from a class. 

- If Student is the blueprint, then Mona and Ali can each be objects. 

- Each object can have different values while still following the same class structure. 

- This is why one class can produce many objects. 

**==> picture [360 x 184] intentionally omitted <==**

## **Board sketch** 

Draw one class box and then 2 or 3 objects below it with different values. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend13 

_This distinction must become automatic_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Class vs Object** 

- Class = design, plan, or definition. 

- Object = actual instance created from that plan. 

- The class describes what is possible. 

- The object stores actual values and performs actual actions. 

**==> picture [360 x 184] intentionally omitted <==**

## **Simple phrase** 

Tell students: “Class is like a form; object is a filled form.” 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend14 

_The two core ingredients inside classes_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Attributes and Methods** 

- Attributes are the data stored by an object. 

- Methods are functions defined inside the class. 

- Attributes answer: what does the object know? 

- Methods answer: what can the object do? 

**==> picture [360 x 184] intentionally omitted <==**

## **Useful line** 

Say: data + behavior together = object-oriented thinking. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend15 

_First syntax exposure should be tiny_ 

**==> picture [960 x 33] intentionally omitted <==**

## **The Simplest Class** 

- Use the class keyword followed by a class name. 

## **Live Code** 

- By convention, class names start with CapitalLetters. 

- pass means the class is empty for now. 

- This is only structure; no object exists yet. 

- `1 class Student:` 

- `2 pass` 

## **Teaching Tip** 

Pause and explain indentation. Students should notice that Python uses blocks through indentation, not braces. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend16 

**==> picture [960 x 33] intentionally omitted <==**

## **Creating Objects from a Class** 

_Instantiation is the action of creating an object_ 

- After defining the class, call the class name like a function. 

## **Live Code** 

- Each call creates a new object. 

- Different variables can store different objects. 

- These objects currently have no custom data yet. 

- `1 class Student:` 

- `2 pass` 

- `3` 

- `4 student1 = Student()` 

- `5 student2 = Student()` 

- `6` 

- `7 print(student1)` 

- `8 print(student2)` 

## **Teaching Tip** 

Run it to show that Python prints object addresses. This proves two distinct objects were created. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend17 

**==> picture [960 x 33] intentionally omitted <==**

## **What Does print(student1) Show?** 

_Students should understand what they are seeing_ 

- Python prints a textual representation of the object. 

- The exact memory-style address is not important for 

   - now. 

- What matters is that student1 and student2 are separate objects. 

- Later we can define better output using special methods, but not today. 

**==> picture [360 x 184] intentionally omitted <==**

## **Reassure students** 

Do not let them get stuck on the printed address. Focus on the idea of distinct instances. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend18 

**==> picture [960 x 33] intentionally omitted <==**

## **Adding Attributes Manually** 

_Show the first way to attach data to an object_ 

- Python lets us assign attributes to an object after creating it. 

## **Live Code** 

- Each object can store different values. 

- This works, but it becomes messy for larger programs. 

- That is why constructors become important. 

- `1 class Student: 2 pass` 

- `3` 

- `4 student1 = Student()` 

- `5 student1.name = "Mona"` 

- `6 student1.level = 2 7` 

- `8 print(student1.name)` 

- `9 print(student1.level)` 

## **Teaching Tip** 

Use this slide to motivate why we need __init__: creating many objects this way is repetitive and risky. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend19 

_Teach motivation, not only syntax_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Manual Attributes Are Weak** 

- We may forget to create an important attribute. 

- Different objects may end up with inconsistent 

   - structure. 

- The code becomes repetitive when many objects are created. 

- A constructor solves these problems by standardizing object creation. 

**==> picture [360 x 184] intentionally omitted <==**

## **Bridge slide** 

This is the “why” behind __init__. Students remember better when they first feel the problem. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend20 

**==> picture [960 x 33] intentionally omitted <==**

## **The Constructor: __init__** 

_The most important method for beginner OOP_ 

- __init__ runs automatically when an object is created. 

## **Live Code** 

- It receives the initial values needed to build the object. 

- This makes object creation consistent and clean. 

- Almost every beginner class starts here. 

- `1 class Student:` 

- `2 def __init__(self, name, level, department): 3 self.name = name 4 self.level = level 5 self.department = department` 

## **Teaching Tip** 

Underline the double underscore before and after init. Then ask: who calls this method? Python calls it automatically. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend21 

_This deserves extra care and repetition_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Does self Mean?** 

- self refers to the current object being created or used. 

- It allows the object to store and access its own attributes. 

- self.name means “the name attribute of this specific object”. 

- Without self, Python would not know which object the data belongs to. 

**==> picture [360 x 184] intentionally omitted <==**

## **Best explanation** 

Say: self is not a special keyword, but it is the standard and expected name for the current instance. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend22 

**==> picture [960 x 33] intentionally omitted <==**

## **Creating Objects with __init__** 

_Now object creation becomes cleaner_ 

- Values are passed directly during object creation. 

- The constructor stores them into self attributes. 

- Each object still has its own data. 

- The code is shorter and easier to read. 

## **Live Code** 

```
1 classStudent:
```

```
2 def__init__(self,name,level,department):
3 self.name =name
4 self.level =level
5 self.department =department
```

```
6
```

- `7 student1 = Student("Mona", 2, "IS") 8 student2 = Student("Ali", 2, "CS") 9` 

- `10 print(student1.name) 11 print(student2.department)` 

## **Teaching Tip** 

Run this and ask students to predict the output before pressing Enter. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend23 

_A crucial concept for avoiding confusion_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Attributes Belong to Objects** 

- student1.name and student2.name can hold different values. 

- Both objects came from the same class, but they are independent instances. 

- Changing one object does not automatically change another object. 

- This is why objects are useful for representing many similar entities. 

**==> picture [360 x 184] intentionally omitted <==**

## **Live prompt** 

Ask: if student1.name changes to “Nour”, does student2.name also change? Why not? 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend24 

**==> picture [960 x 33] intentionally omitted <==**

## **Adding a Method** 

_Now add behavior, not just data_ 

- A method is a function defined inside a class. 

## **Live Code** 

- Methods also use self to access object attributes. 

- This lets the object perform meaningful actions. 

- Methods make objects feel active, not just passive data containers. 

## `1 class Student:` 

```
2 def__init__(self,name,level,department):
3 self.name =name
```

- `4 self.level = level 5 self.department = department` 

- `6 7 def display_info(self): 8 print(self.name, self.level, self.department) 9` 

- `10 student1 = Student("Mona", 2, "IS") 11 student1.display_info()` 

## **Teaching Tip** 

Pause at the dot notation: student1.display_info() means call the method on that object. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend25 

_Break the invisible process into steps_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Method Call Flow** 

- The object student1 already exists. 

- student1.display_info() calls the method display_info. 

- Inside the method, self becomes student1. 

- So self.name actually means student1.name during 

   - this call. 

**==> picture [360 x 184] intentionally omitted <==**

## **Very important** 

This is where many students finally understand self. Use object substitution explicitly. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend26 

**==> picture [960 x 33] intentionally omitted <==**

## **Print vs Return Inside Methods** 

_Students should not confuse console output with returned values_ 

- print shows a result on the screen. 

## **Live Code** 

- return sends a value back to the caller. 

- Methods can do either one depending on the need. 

- Backend functions often return values for later use, not only display them. 

- `1 class Course: 2 def __init__(self, title, hours): 3 self.title = title 4 self.hours = hours 5 6 def description(self): -` 

- `7 return f"{self.title} {self.hours} hours" 8 9 course1 = Course("Python", 3)` 

- `10 print(course1.description())` 

## **Teaching Tip** 

Ask what would happen if description used print instead of return. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend27 

**==> picture [960 x 33] intentionally omitted <==**

## **Class Task - Build a Simple Course Class** 

_Practice is where understanding becomes skill_ 

- Create a Course class with title, code, and hours. 

- Add a method called show_course() that prints the data. 

- Create two Course objects with different values. 

- Run the method for both objects. 

**==> picture [360 x 194] intentionally omitted <==**

## **Expected Direction** 

Walk around and check two things: correct indentation and correct use of self. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend28 

_Style supports readability_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Naming Conventions in OOP** 

- Class names usually use PascalCase: Student, Course, LibraryBook. 

- Attributes and method names usually use snake_case: student_name, display_info. 

- Choose names that explain meaning, not short unclear names. 

- Readable code is easier to debug and maintain. 

**==> picture [360 x 184] intentionally omitted <==**

## **Relate to Lecture 2** 

Connect this to good variable naming. OOP still depends on clear names. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend29 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 3 - Constructors, Inheritance, and Design** 

Go one level deeper than basic classes. 

**==> picture [368 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend30 

_A constructor creates discipline_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Constructors Matter So Much** 

- It guarantees that each object starts with the required attributes. 

- It reduces repeated code during object creation. 

- It makes the class easier to understand because initialization is explicit. 

- It lowers the chance of inconsistent objects. 

**==> picture [360 x 184] intentionally omitted <==**

## **Use contrast** 

Compare a constructor-based class to the earlier manualattribute example. Students should feel why this is better. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend31 

**==> picture [960 x 33] intentionally omitted <==**

## **Constructor with a Default Value** 

_This is a practical extension students often need_ 

- Some attributes can have a standard default. 

## **Live Code** 

- If the caller does not provide a value, Python uses the default. 

- This keeps the object flexible while staying organized. 

- Defaults are common in real backend code. 

- `1 class Student:` 

```
2 def__init__(self,name,level,
department="General"):
3 self.name =name
4 self.level =level
5 self.department =department
6
```

- `7 student1 = Student("Mona", 2)` 

- `8 student2 = Student("Ali", 2, "CS") 9` 

- `10 print(student1.department) 11 print(student2.department)` 

## **Teaching Tip** 

This slide helps students see that constructors can be friendly, not rigid. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend32 

**==> picture [960 x 33] intentionally omitted <==**

## **Updating Object Data Through Methods** 

_Objects should manage their own state cleanly_ 

- Methods can update attributes in a controlled way. 

- This is better than changing values randomly all over the program. 

- It keeps related logic inside the class. 

- This is the start of cleaner software design. 

## **Live Code** 

## `1 class Student:` 

- `2 def __init__(self, name, level): 3 self.name = name 4 self.level = level 5 6 def promote(self): 7 self.level += 1` 

- `8` 

- `9 student1 = Student("Mona", 2)` 

- `10 student1.promote()` 

- `11 print(student1.level)` 

## **Teaching Tip** 

Ask students to explain why level changed. Make them speak the sequence of events. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend33 

_Students should see it as “extension”, not magic_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Is Inheritance?** 

- Inheritance allows a new class to reuse data and methods from an existing class. 

- The existing class is often called the parent or base 

   - class. 

- The new class is called the child or derived class. 

- This avoids repeating common logic. 

**==> picture [360 x 184] intentionally omitted <==**

## **Simple phrase** 

Say: inheritance means “is a special kind of”. A Student is a kind of Person. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend34 

_Explain the benefit before showing syntax_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Inheritance Is Useful** 

- Many classes share common information such as name or ID. 

- We do not want to rewrite the same code in many places. 

- Inheritance collects shared logic in one parent class. 

- Child classes can then add their own extra features. 

**==> picture [360 x 184] intentionally omitted <==**

## **Example set** 

Person -> Student, Teacher. Vehicle -> Car, Bus. Account -> AdminAccount, CustomerAccount. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend35 

**==> picture [960 x 33] intentionally omitted <==**

## **A First Inheritance Example** 

_Keep the first example simple and readable_ 

- Person holds shared data. 

## **Live Code** 

- Student inherits from Person. 

- Student adds one extra attribute called level. 

- The child class still uses the parent constructor through super(). 

- `1 class Person: 2 def __init__(self, name): 3 self.name = name 4 5 class Student(Person): 6 def __init__(self, name, level): 7 super().__init__(name) 8 self.level = level 9` 

- `10 student1 = Student("Mona", 2) 11 print(student1.name) 12 print(student1.level)` 

## **Teaching Tip** 

Explain super() as a way to call the parent class logic instead of rewriting it. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend36 

_A common beginner question_ 

**==> picture [960 x 33] intentionally omitted <==**

## **What Does super() Do?** 

- super() gives access to methods from the parent class. 

- In constructors, it is often used to initialize shared attributes. 

- This avoids copying parent code into the child class. 

- It keeps the relationship clean and maintainable. 

**==> picture [360 x 184] intentionally omitted <==**

## **Teaching note** 

You do not need deep theory here. Just teach the practical idea: reuse the parent initialization. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend37 

**==> picture [960 x 33] intentionally omitted <==**

## **Method Overriding** 

_Show how a child class can customize behavior_ 

- A child class can redefine a method from the parent class. 

## **Live Code** 

- This is called overriding. 

- The child keeps the same method name but changes the behavior. 

- This is useful when classes share a concept but not identical output. 

- `1 class Person: 2 def introduce(self): 3 print("I am a person")` 

- `4` 

- `5 class Student(Person): 6 def introduce(self): 7 print("I am a student")` 

- `8` 

- `9 p = Person()` 

- `10 s = Student() 11 p.introduce() 12 s.introduce()` 

## **Teaching Tip** 

Run this and ask why two outputs differ even though the method name is the same. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend38 

**==> picture [960 x 33] intentionally omitted <==**

## **Class Task - Design an Inheritance Example** 

_Practice is where understanding becomes skill_ 

- Create a base class called Animal with a name 

   - attribute. 

- Create a child class called Cat that adds a color 

   - attribute. 

- Print both the name and the color. 

- If time allows, add a speak() method in both 

   - classes. 

**==> picture [360 x 194] intentionally omitted <==**

## **Expected Direction** 

The goal is to practice parent-child structure and super(), not to create a perfect project. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend39 

_A design-thinking slide_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Inheritance vs Repetition** 

- If two classes share important behavior, inheritance may help. 

- If they only happen to look similar once, repetition may be simpler. 

- Do not use inheritance just because it exists. 

- Use it when the relationship is meaningful and improves clarity. 

**==> picture [360 x 184] intentionally omitted <==**

## **Instructor note** 

This slide builds judgment, not just syntax. Keep it simple and practical. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend40 

_Introduce the idea gently_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Public vs “Private” in Beginner Python** 

- Python does not enforce privacy like some other languages do. 

- However, a leading underscore _name suggests internal use by convention. 

- For beginners, the main lesson is to treat important data carefully. 

- Later, larger frameworks rely on discipline and conventions a lot. 

**==> picture [360 x 184] intentionally omitted <==**

## **Keep it light** 

Do not turn this into advanced theory. Just plant the idea that naming can signal design intention. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend41 

_Not everything should be inheritance_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Composition: Another Design Idea** 

- Composition means one object contains another object as part of its structure. 

- A Course may have an Instructor object, not inherit from Instructor. 

- A Car has an Engine; it is not a type of Engine. 

- This helps students think more carefully about relationships. 

**==> picture [360 x 184] intentionally omitted <==**

## **Useful sentence** 

Inheritance is “is a”; composition is “has a”. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend42 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 4 - File Handling in Python** 

Now shift from memory to permanent data storage. 

**==> picture [368 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend43 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Do We Need Files?** 

_Programs often need data after they stop running_ 

- Variables disappear when the program ends. 

- Files let us store data for later use. 

- Backend systems save logs, reports, settings, 

   - uploads, and exported data. 

- File handling is the first step toward thinking about persistence. 

**==> picture [360 x 184] intentionally omitted <==**

## **Backend link** 

Before databases, help students understand the simpler idea of storing information outside RAM. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend44 

_Make the topic feel real_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Common Backend Uses of Files** 

- Saving text reports and logs. 

- Reading configuration values or templates. 

- Exporting data to CSV or text files. 

- Working with JSON files for structured data exchange. 

**==> picture [360 x 184] intentionally omitted <==**

## **Prompt** 

Ask students which of these they have already seen in websites or apps, even if they did not know the implementation. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend45 

_Introduce the doorway to file work_ 

**==> picture [960 x 33] intentionally omitted <==**

## **The open() Function** 

- open() is used to access a file. 

- It usually needs a file name and a mode. 

- The mode tells Python what we want to do: read, 

   - write, append, and so on. 

- After using the file, we should close it or use with open(...). 

**==> picture [360 x 184] intentionally omitted <==**

## **Core habit** 

Teach “open, use, close” as a simple lifecycle. Then improve it with with open. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend46 

_Students should memorize these early_ 

**==> picture [960 x 33] intentionally omitted <==**

## **File Modes You Must Know** 

- r = read from an existing file. 

- w = write to a file; creates or overwrites content. 

- a = append to the end of a file. 

- x = create a new file and fail if it already exists. 

**==> picture [360 x 184] intentionally omitted <==**

## **Warning** 

Emphasize that w can erase old content. Many beginners lose data here. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend47 

**==> picture [960 x 33] intentionally omitted <==**

## **Writing to a Text File** 

_The first complete file example_ 

- Open the file in write mode. 

## **Live Code** 

- Use write() to send text to the file. 

- Close the file after writing. 

- Then open the created file to inspect the result. 

- `1 file = open("students.txt", "w")` 

- `2 file.write("Mona` 

- `3 ")` 

- `4 file.write("Ali` 

- `5 ")` 

- `6 file.close()` 

- `7` 

- `8 print("File written successfully")` 

## **Teaching Tip** 

Run it, then open the file visually in VS Code so students see the real saved text. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend48 

**==> picture [960 x 33] intentionally omitted <==**

## **What Does** 

**Mean?** _A tiny but necessary explanation_ 

- is the newline character. 

- It moves the next text to a new line. 

- Without it, written content may appear on one long line. 

- Text formatting matters when people read output files. 

**==> picture [360 x 184] intentionally omitted <==**

## **Micro-demo** 

Remove 

once and run again so students feel the difference. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend49 

_The reverse of writing_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Reading from a File** 

- Open the file in read mode. 

**==> picture [55 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use read() to get the full content as one string. 

- Store the content in a variable. 

- Print the result to the terminal. 

- `1 file = open("students.txt", "r")` 

- `2 content = file.read()` 

- `3 file.close()` 

```
4
```

- `5 print(content)` 

## **Teaching Tip** 

Explain that content now lives in memory as a Python string. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend50 

**==> picture [960 x 33] intentionally omitted <==**

## **Appending New Data** 

_Keep old content and add more_ 

- Append mode adds text to the end of the existing file. 

## **Live Code** 

- It is useful for logs, records, and gradual updates. 

- Unlike w mode, it does not delete the old content. 

- This difference is essential in backend tasks. 

- `1 file = open("students.txt", "a") 2 file.write("Nour` 

- `3 ")` 

- `4 file.close()` 

- `5` 

- `6 print("New line added")` 

## **Teaching Tip** 

Ask students to predict the final file content before opening the file. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend51 

_Different ways to read text_ 

**==> picture [960 x 33] intentionally omitted <==**

## **read(), readline(), and readlines()** 

- read() returns the whole file as one string. 

- readline() returns only one line at a time. 

- readlines() returns a list of lines. 

- The best choice depends on the task and file size. 

**==> picture [360 x 184] intentionally omitted <==**

## **Teaching idea** 

This is a good moment to connect file reading to lists from Lecture 2. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend52 

**==> picture [960 x 33] intentionally omitted <==**

## **Using readlines()** 

_Show how file data becomes a list_ 

- Each line becomes one element in the list. 

## **Live Code** 

- We can loop over the lines easily. 

- This is useful when processing records one by one. 

- Remember that newline characters may still be present. 

- `1 file = open("students.txt", "r")` 

- `2 lines = file.readlines()` 

- `3 file.close()` 

- `4` 

- `5 for line in lines: 6 print(line.strip())` 

## **Teaching Tip** 

Explain strip() as removing extra whitespace and newline characters. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend53 

_Teach the safer modern style_ 

**==> picture [960 x 33] intentionally omitted <==**

## **The with Statement** 

- with open(...) automatically closes the file when the block ends. 

- This is safer and cleaner than remembering close() manually. 

- It reduces the chance of leaving files open by mistake. 

- In professional Python code, this is the preferred 

   - pattern. 

**==> picture [360 x 184] intentionally omitted <==**

## **Strong recommendation** 

After this slide, prefer with open in almost all later examples. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend54 

**==> picture [960 x 33] intentionally omitted <==**

## **Writing with with open** 

_Students should start adopting the better style immediately_ 

- Open the file using with open(...). 

**==> picture [55 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Write inside the indented block. 

- No explicit close() is needed. 

- When the block ends, Python closes the file automatically. 

- `1 with open("courses.txt", "w") as file: 2 file.write("Backend Python` 

- `3 ") 4 file.write("Django 5 ")` 

- `6` 

- `7 print("Done")` 

## **Teaching Tip** 

This is a slide worth repeating verbally: safer, shorter, cleaner. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend55 

_Many file errors are really path errors_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Relative Paths and Working Folder** 

- A relative path is based on the current working folder. 

- If the file is not where Python expects, open() will fail. 

- Students should know where their script is running from. 

- Good folder organization prevents confusion. 

**==> picture [360 x 184] intentionally omitted <==**

## **Live demonstration** 

Show the location of the .py file and the created text file inside the same folder. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend56 

_Useful for debugging file path problems_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Checking the Current Folder** 

- Python can tell us the current working directory. 

## **Live Code** 

- This helps explain why a file is or is not found. 

- It is a practical debugging habit. 

- Do not memorize blindly; understand why it helps. 

- `1 import os` 

- `2` 

- `3 print(os.getcwd())` 

## **Teaching Tip** 

Run this in class and compare the displayed path to the folder students opened in VS Code. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend57 

_Prepare students for realistic problems_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Common File Errors** 

- FileNotFoundError appears when a file path is wrong or the file does not exist. 

- PermissionError may appear when the program cannot access the file. 

- Using the wrong mode may overwrite data or fail to read content. 

- Most file bugs are solved by checking path, mode, and spelling. 

**==> picture [360 x 184] intentionally omitted <==**

## **Error mindset** 

Teach students not to panic. Read the error message carefully before changing random code. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend58 

**==> picture [960 x 33] intentionally omitted <==**

## **Handling File Errors with try/except** 

_Beginner-friendly error handling for files_ 

- try runs the risky code. 

**==> picture [55 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- except catches an expected error and handles it gracefully. 

- This is better than letting the program crash without explanation. 

- Backend systems often use this pattern around input and file operations. 

**==> picture [342 x 80] intentionally omitted <==**

**----- Start of picture text -----**<br>
1 try:<br>2  with open("missing.txt", "r") as file:<br>3  print(file.read())<br>4 except FileNotFoundError:<br>5  print("The file does not exist.")<br>**----- End of picture text -----**<br>


## **Teaching Tip** 

This slide also reinforces the error handling ideas from Lecture 2. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend59 

**==> picture [960 x 33] intentionally omitted <==**

## **CSV and JSON: Two Common Data Formats** 

_Move from plain text to structured files_ 

- CSV is useful for table-like data such as rows and columns. 

- JSON is useful for structured key-value data. 

- Backend systems often exchange JSON with frontends and APIs. 

- So JSON is especially important for web-related 

   - work. 

**==> picture [360 x 184] intentionally omitted <==**

## **Future connection** 

Tell students that Django views and APIs often work with JSON-like structures. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend60 

_Keep JSON very concrete_ 

**==> picture [960 x 33] intentionally omitted <==**

## **A Simple JSON Example** 

- Python dictionaries map naturally to JSONlike thinking. 

## **Live Code** 

- Use the json module to save structured data. 

- This is more expressive than raw text for many tasks. 

- It prepares students for API-style data later. 

- `1 import json 2` 

- `3 student = { 4 "name": "Mona", 5 "level": 2, 6 "department": "IS" 7 } 8` 

- `9 with open("student.json", "w") as file:` 

- `10 json.dump(student, file, indent=4)` 

## **Teaching Tip** 

After running, open the JSON file so students see the readable structure. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend61 

**==> picture [960 x 33] intentionally omitted <==**

## **Reading JSON Back into Python** 

_Show the round-trip idea_ 

- Open the JSON file in read mode. 

**==> picture [55 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Use json.load() to convert file content back into a Python object. 

- The result is often a dictionary or list. 

- Now the data can be used by the program again. 

- `1 import json 2` 

- `3 with open("student.json", "r") as file: 4 data = json.load(file)` 

- `5` 

- `6 print(data["name"])` 

- `7 print(data["department"])` 

## **Teaching Tip** 

This is a beautiful moment to connect file handling, dictionaries, and future APIs. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend62 

**==> picture [960 x 33] intentionally omitted <==**

## **Class Task - Choose the Correct File Mode** 

_Practice is where understanding becomes skill_ 

- If you want to read an existing file, which mode do you use? 

- If you want to add a line without deleting old content, which mode do you use? 

- If you want to create a fresh report and replace any old version, which mode do you use? 

- Discuss answers in pairs before sharing. 

**==> picture [360 x 194] intentionally omitted <==**

## **Expected Direction** 

Expected answers: r for read, a for append, w for overwrite or fresh writing. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend63 

**==> picture [960 x 33] intentionally omitted <==**

## **Part 5 - Combining OOP and Files** 

Now integrate both topics into one coherent example. 

**==> picture [368 x 130] intentionally omitted <==**

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend64 

_This looks more like real software_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Why Combine OOP and Files?** 

- Objects help us organize program logic. 

- Files help us preserve data between runs. 

- Together they allow us to build small systems instead of isolated scripts. 

- This is a strong preparation step before databases and Django models. 

**==> picture [360 x 184] intentionally omitted <==**

## **Big picture** 

Tell students: a backend app often models entities as objects and stores or exchanges their data somehow. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend65 

**==> picture [960 x 33] intentionally omitted <==**

## **Mini Example: Student Object to Dictionary** 

_Objects are not written directly to JSON without conversion_ 

- JSON understands basic data structures like dict and list. 

- A custom object should be converted into a dictionary first. 

- This is an important design step. 

- It also teaches students how to think about serialization. 

## **Live Code** 

- `1 class Student: 2 def __init__(self, name, level, department): 3 self.name = name 4 self.level = level 5 self.department = department 6 7 def to_dict(self): 8 return { 9 "name": self.name,` 

- `10 "level": self.level, 11 "department": self.department 12 }` 

## **Teaching Tip** 

Introduce the word “serialize” briefly: turn object data into a savable format. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend66 

**==> picture [960 x 33] intentionally omitted <==**

## **Saving a List of Objects to JSON** 

_A practical combined example_ 

- Create several Student objects. 

**==> picture [55 x 9] intentionally omitted <==**

**----- Start of picture text -----**<br>
Live Code<br>**----- End of picture text -----**<br>


- Convert each object into a dictionary. 

- Store the dictionaries in a list. 

- Write that list into a JSON file. 

- `1 import json 2 3 students = [ 4 Student("Mona", 2, "IS"), 5 Student("Ali", 2, "CS") 6 ] 7` 

- `8 data = [student.to_dict() for student in students] 9` 

- `10 with open("students.json", "w") as file: 11 json.dump(data, file, indent=4)` 

## **Teaching Tip** 

Walk slowly through the list comprehension. This is a rich slide with many ideas combined. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend67 

**==> picture [960 x 33] intentionally omitted <==**

## **Reading JSON and Recreating Objects** 

_Reverse the process clearly_ 

- Load the JSON file into a Python list of dictionaries. 

## **Live Code** 

- Loop through the dictionaries. 

- Create Student objects again from the stored values. 

- Now the program regains object-based structure from file data. 

- `1 import json` 

- `2` 

- `3 with open("students.json", "r") as file: 4 data = json.load(file)` 

- `5` 

- `6 students = []` 

- `7 for item in data:` 

- `8 student = Student(item["name"], item["level"], item["department"]) 9 students.append(student)` 

## **Teaching Tip** 

This slide shows how persistence and OOP cooperate. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend68 

_Students need folder habits, not only code_ 

**==> picture [960 x 33] intentionally omitted <==**

## **A Simple Project Structure** 

- project_folder/ 

- • main.py 

- models.py 

- students.json 

- Separating files by role improves readability and reuse. 

**==> picture [360 x 184] intentionally omitted <==**

## **Good habit** 

Even in small class examples, show structure. It will make Django feel less intimidating later. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend69 

**==> picture [960 x 33] intentionally omitted <==**

## **Running a Multi-File Project** 

_Students should know the execution flow_ 

- Put the Student class inside models.py. 

## **Live Code** 

- Import Student into main.py. 

- Run main.py from the terminal. 

- Keep all files inside the same project folder. 

- `1 # models.py 2 class Student: 3 def __init__(self, name, level): 4 self.name = name 5 self.level = level 6 7 # main.py 8 from models import Student 9` 

- `10 student1 = Student("Mona", 2) 11 print(student1.name)` 

## **Teaching Tip** 

Use this to show that larger programs are made of multiple files, not one giant script. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend70 

_Explicitly teach the debugging mindset_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Debugging Tips for Today’s Lecture** 

- Check indentation first when Python gives a syntaxrelated error. 

- Check spelling of class names, method names, and file names. 

- Check whether self is missing in methods. 

- Check file mode and path when file operations fail. 

**==> picture [360 x 184] intentionally omitted <==**

## **Calm students down** 

Tell them most beginner errors are small and local. Debugging is reading carefully, not guessing wildly. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend71 

_Make the invisible pain visible_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Common Beginner Mistakes in OOP** 

- Forgetting self in a method definition. 

- Using a constructor parameter but forgetting to save it with self. 

- Trying to use an attribute before it exists. 

- Calling a method without parentheses when trying to execute it. 

**==> picture [360 x 184] intentionally omitted <==**

## **Make it interactive** 

Ask students which one they already made during the lecture. Normalize mistakes. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend72 

_Prevent frustration before homework_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Common Beginner Mistakes in File Handling** 

- Opening the wrong file name or wrong folder. 

- Using w when a was intended. 

- Forgetting that read() returns a string, not a list. 

- Writing JSON-like text manually instead of using json.dump(). 

**==> picture [360 x 184] intentionally omitted <==**

## **Teacher move** 

Give one concrete example of each mistake. Students learn well from near-errors. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend73 

**==> picture [960 x 33] intentionally omitted <==**

## **Mini Quiz 1** 

_Use these questions to check understanding before moving on_ 

- What is the difference between a class and an object? 

- Why do we use self inside methods? 

- What is the role of __init__? 

- What is one advantage of inheritance? 

## **How to use** 

Read each question, pause, collect answers orally, then ask students to justify why their answer is correct. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend74 

**==> picture [960 x 33] intentionally omitted <==**

## **Mini Quiz 2** 

_Use these questions to check understanding before moving on_ 

- What is the difference between w mode and a mode? 

- Why is with open(...) recommended? 

- What Python data structure is commonly loaded from a JSON object? 

- Why might FileNotFoundError happen? 

## **How to use** 

Read each question, pause, collect answers orally, then ask students to justify why their answer is correct. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend75 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Recap - OOP** 

_Compress the first half into memorable ideas_ 

- A class is a blueprint; an object is an instance. 

- Attributes store data; methods define behavior. 

- self refers to the current object. 

- Constructors initialize objects, and inheritance 

   - supports reuse. 

**==> picture [360 x 184] intentionally omitted <==**

## **Recap style** 

Ask students to repeat each pair aloud: class/object, attribute/method, parent/child. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend76 

_Compress the second half into practical rules_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Lecture Recap - File Handling** 

- Files store data beyond program execution. 

- The main modes are r, w, and a. 

- with open(...) is safer and cleaner. 

- JSON is a practical structured format for backend- 

   - style data. 

**==> picture [360 x 184] intentionally omitted <==**

## **Recap style** 

Keep this short and confident. Students should leave with a small clear list to remember. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend77 

**==> picture [960 x 33] intentionally omitted <==**

## **Homework** 

_Practice is where understanding becomes skill_ 

- Create a Book class with title, author, and pages. 

- Add a method that returns a short description string. 

- Create at least three Book objects and save them to a JSON file. 

- Read the file again and print the loaded data. 

**==> picture [360 x 194] intentionally omitted <==**

## **Expected Direction** 

This homework checks class design, object creation, method use, JSON writing, and JSON reading in one task. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend78 

_Keep the course connected_ 

**==> picture [960 x 33] intentionally omitted <==**

## **Preview of Lecture 4** 

- The next lecture moves to web basics before Django. 

- We will explain HTTP, request, response, URL, domain, and status code. 

- This means we now move from “Python programs” to “web communication”. 

- Everything from Lectures 1 to 3 will support that transition. 

**==> picture [360 x 184] intentionally omitted <==**

## **Close with anticipation** 

Students should feel that each lecture is building toward real web applications. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend79 

**==> picture [960 x 33] intentionally omitted <==**

## **End of Lecture 3** 

_Questions, live code review, or extra practice if time remains_ 

- Re-run one class example slowly if students still feel uncertain. 

- Re-run one file example and let a student explain each line. 

- Invite students to ask about self, __init__, and file modes one more time. 

- Encourage them to practice by typing, not only reading. 

**==> picture [360 x 184] intentionally omitted <==**

## **Final teaching tip** 

The lecture succeeds if students can explain the logic in their own words, not only copy syntax. 

Backend Python + Django | FCAI - Cairo University 

Lecture 3 | OOP and File Handling for Backend80 

