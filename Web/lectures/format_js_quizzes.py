import sys

with open("js.html", "r", encoding="utf-8") as f:
    html = f.read()

replacements = [
    (
        '<div class="q-text">What will be the output of: const VALUE=10; VALUE=20;</div>',
        '''<div class="q-text">What will be the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> VALUE = <span class="num">10</span>;
VALUE = <span class="num">20</span>;</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What will be the value of X?  var X=10; function myfunc(){ let x=20; } document.write(X);</div>',
        '''<div class="q-text">What will be the value of X?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> X = <span class="num">10</span>;
<span class="kw">function</span> <span class="fn">myfunc</span>() {
  <span class="kw">let</span> x = <span class="num">20</span>;
}
document.<span class="fn">write</span>(X);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output of: var a = 10 + 20 + "5";</div>',
        '''<div class="q-text">What is the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> a = <span class="num">10</span> <span class="op">+</span> <span class="num">20</span> <span class="op">+</span> <span class="str">"5"</span>;</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What will be the output? var x = 12.34; document.getElementById("test").innerHTML = typeof(x);</div>',
        '''<div class="q-text">What will be the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> x = <span class="num">12.34</span>;
document.<span class="fn">getElementById</span>(<span class="str">"test"</span>).<span class="prop">innerHTML</span> = <span class="kw">typeof</span>(x);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What will be the output? var a; document.write(a);</div>',
        '''<div class="q-text">What will be the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> a;
document.<span class="fn">write</span>(a);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the result of running this code in strict mode?  "use strict"; x = 10; console.log(x);</div>',
        '''<div class="q-text">What is the result of running this code in strict mode?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="str">"use strict"</span>;
x = <span class="num">10</span>;
console.<span class="fn">log</span>(x);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? <code>var x=\'5\'; var y=2; console.log(x+y);</code></div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> x = <span class="str">'5'</span>;
<span class="kw">var</span> y = <span class="num">2</span>;
console.<span class="fn">log</span>(x <span class="op">+</span> y);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? <code>var x=\'5\'; var y=2; console.log(x-y);</code></div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> x = <span class="str">'5'</span>;
<span class="kw">var</span> y = <span class="num">2</span>;
console.<span class="fn">log</span>(x <span class="op">-</span> y);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? <code>let x=5; if(true){ let x=2; } console.log(x);</code></div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">let</span> x = <span class="num">5</span>;
<span class="kw">if</span> (<span class="bool">true</span>) {
  <span class="kw">let</span> x = <span class="num">2</span>;
}
console.<span class="fn">log</span>(x);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output of <code>console.log(null === undefined);</code>?</div>',
        '''<div class="q-text">What is the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code>console.<span class="fn">log</span>(<span class="bool">null</span> <span class="op">===</span> <span class="bool">undefined</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text"><code>var a=200; var b="200";</code> — <code>a == b</code> returns true while <code>a === b</code> returns false.</div>',
        '''<div class="q-text">Consider the following code:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> a = <span class="num">200</span>;
<span class="kw">var</span> b = <span class="str">"200"</span>;</code></pre>
          </div>
          <br><code>a == b</code> returns true while <code>a === b</code> returns false.
        </div>'''
    ),
    (
        '<div class="q-text">What will be the output? function test(...args){ document.write(typeof(args)); } test(12);</div>',
        '''<div class="q-text">What will be the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">function</span> <span class="fn">test</span>(...args) {
  document.<span class="fn">write</span>(<span class="kw">typeof</span>(args));
}
<span class="fn">test</span>(<span class="num">12</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">In the following function: function multiply(...myNumbers){...}, the "..." will:</div>',
        '''<div class="q-text">In the following function:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">function</span> <span class="fn">multiply</span>(...myNumbers) { ... }</code></pre>
          </div>
          The "..." will:
        </div>'''
    ),
    (
        '<div class="q-text">const f = (a,b) => a+b+5; — What will f(4,5) return?</div>',
        '''<div class="q-text">Given the function:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> <span class="fn">f</span> = (a, b) <span class="kw">=&gt;</span> a <span class="op">+</span> b <span class="op">+</span> <span class="num">5</span>;</code></pre>
          </div>
          What will <code>f(4,5)</code> return?
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? let x=10; let y=20; let text="x * y"; let result=eval(text); innerHTML=result;</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">let</span> x = <span class="num">10</span>;
<span class="kw">let</span> y = <span class="num">20</span>;
<span class="kw">let</span> text = <span class="str">"x * y"</span>;
<span class="kw">let</span> result = <span class="fn">eval</span>(text);
<span class="prop">innerHTML</span> = result;</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? let x=10; let y=20; let text="y-x"; let result=eval(text); document.write(result);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">let</span> x = <span class="num">10</span>;
<span class="kw">let</span> y = <span class="num">20</span>;
<span class="kw">let</span> text = <span class="str">"y-x"</span>;
<span class="kw">let</span> result = <span class="fn">eval</span>(text);
document.<span class="fn">write</span>(result);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var writeMe = "console.log(\'document.writeln(x);\')"; var x = 13; eval(writeMe); — What is the output?</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> writeMe = <span class="str">"console.log('document.writeln(x);')"</span>;
<span class="kw">var</span> x = <span class="num">13</span>;
<span class="fn">eval</span>(writeMe);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">x = "20"; y = 10; document.writeln(x + y, x - y); — What is the output?</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code>x = <span class="str">"20"</span>;
y = <span class="num">10</span>;
document.<span class="fn">writeln</span>(x <span class="op">+</span> y, x <span class="op">-</span> y);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">If <code>const f = (a, b) =&gt; a + b + 5;</code>, which statement is correct?</div>',
        '''<div class="q-text">If you have the function:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> <span class="fn">f</span> = (a, b) <span class="kw">=&gt;</span> a <span class="op">+</span> b <span class="op">+</span> <span class="num">5</span>;</code></pre>
          </div>
          Which statement is correct?
        </div>'''
    ),
    (
        '<div class="q-text">The <code>...</code> in <code>function multiply(...myNumbers)</code> is called:</div>',
        '''<div class="q-text">The <code>...</code> in the following code is called:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">function</span> <span class="fn">multiply</span>(...myNumbers) { ... }</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">Which ES6 arrow function is the concise equivalent of <code>function square(x) { return x * x; }</code>?</div>',
        '''<div class="q-text">Which ES6 arrow function is the concise equivalent of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">function</span> <span class="fn">square</span>(x) {
  <span class="kw">return</span> x <span class="op">*</span> x;
}</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">const arr=[10,20,30]; let result=0; arr.forEach(myFunction); function myFunction(value){result+=value;} document.write("Result: "+result);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> arr = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];
<span class="kw">let</span> result = <span class="num">0</span>;
arr.<span class="fn">forEach</span>(myFunction);

<span class="kw">function</span> <span class="fn">myFunction</span>(value) {
  result <span class="op">+=</span> value;
}
document.<span class="fn">write</span>(<span class="str">"Result: "</span> <span class="op">+</span> result);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">const values=[10,20,30]; const result=values.map(myFunction); function myFunction(value){return value*value;} document.write("Result: "+result);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> values = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];
<span class="kw">const</span> result = values.<span class="fn">map</span>(myFunction);

<span class="kw">function</span> <span class="fn">myFunction</span>(value) {
  <span class="kw">return</span> value <span class="op">*</span> value;
}
document.<span class="fn">write</span>(<span class="str">"Result: "</span> <span class="op">+</span> result);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[1,2,3,4]; function myfunc(total,value){return total+value;} var sum=numbers.reduce(myfunc, 2);</div>',
        '''<div class="q-text">What is the value of <code>sum</code>?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>];
<span class="kw">function</span> <span class="fn">myfunc</span>(total, value) {
  <span class="kw">return</span> total <span class="op">+</span> value;
}
<span class="kw">var</span> sum = numbers.<span class="fn">reduce</span>(myfunc, <span class="num">2</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[170,50,25]; function myfunc(total,value){return total-value;} var sum=numbers.reduce(myfunc); document.write(sum);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">170</span>, <span class="num">50</span>, <span class="num">25</span>];
<span class="kw">function</span> <span class="fn">myfunc</span>(total, value) {
  <span class="kw">return</span> total <span class="op">-</span> value;
}
<span class="kw">var</span> sum = numbers.<span class="fn">reduce</span>(myfunc);
document.<span class="fn">write</span>(sum);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[1,2,3,4]; function myfunc(total,value){return total+value;} var sum=numbers.reduce(myfunc, 3);</div>',
        '''<div class="q-text">What is the value of <code>sum</code>?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>];
<span class="kw">function</span> <span class="fn">myfunc</span>(total, value) {
  <span class="kw">return</span> total <span class="op">+</span> value;
}
<span class="kw">var</span> sum = numbers.<span class="fn">reduce</span>(myfunc, <span class="num">3</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var x=[10,20,30]; function myFunction(value){return value>10;} var y=x.find(myFunction); document.write(y);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> x = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];
<span class="kw">function</span> <span class="fn">myFunction</span>(value) {
  <span class="kw">return</span> value <span class="op">&gt;</span> <span class="num">10</span>;
}
<span class="kw">var</span> y = x.<span class="fn">find</span>(myFunction);
document.<span class="fn">write</span>(y);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[10,20,30]; function myFunction(value){return value>10;} var y=numbers.filter(myFunction); document.write(typeof(y));</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];
<span class="kw">function</span> <span class="fn">myFunction</span>(value) {
  <span class="kw">return</span> value <span class="op">&gt;</span> <span class="num">10</span>;
}
<span class="kw">var</span> y = numbers.<span class="fn">filter</span>(myFunction);
document.<span class="fn">write</span>(<span class="kw">typeof</span>(y));</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[10,20,30]; function myFunction(value){return value>10;} var y=numbers.some(myFunction); document.write(typeof(y));</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">30</span>];
<span class="kw">function</span> <span class="fn">myFunction</span>(value) {
  <span class="kw">return</span> value <span class="op">&gt;</span> <span class="num">10</span>;
}
<span class="kw">var</span> y = numbers.<span class="fn">some</span>(myFunction);
document.<span class="fn">write</span>(<span class="kw">typeof</span>(y));</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var numbers=[10,20,10,30]; var y=numbers.lastIndexOf(10); var z=numbers.indexOf(30); document.write(y+z);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> numbers = [<span class="num">10</span>, <span class="num">20</span>, <span class="num">10</span>, <span class="num">30</span>];
<span class="kw">var</span> y = numbers.<span class="fn">lastIndexOf</span>(<span class="num">10</span>);
<span class="kw">var</span> z = numbers.<span class="fn">indexOf</span>(<span class="num">30</span>);
document.<span class="fn">write</span>(y <span class="op">+</span> z);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var quiz=[1,2,3]; var result=quiz.concat(6,7,8); document.write(result);</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> quiz = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>];
<span class="kw">var</span> result = quiz.<span class="fn">concat</span>(<span class="num">6</span>, <span class="num">7</span>, <span class="num">8</span>);
document.<span class="fn">write</span>(result);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">myNumbers=[1,2,3]; x=myNumbers.pop() — The removed item will be 3?</div>',
        '''<div class="q-text">Given the code:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code>myNumbers = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>];
x = myNumbers.<span class="fn">pop</span>();</code></pre>
          </div>
          The removed item will be 3?
        </div>'''
    ),
    (
        '<div class="q-text">var colors = {1:"red", 2:"green", 3:"blue"} — Is this one of the ways of defining an array in JavaScript?</div>',
        '''<div class="q-text">Consider the code:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> colors = {<span class="num">1</span>:<span class="str">"red"</span>, <span class="num">2</span>:<span class="str">"green"</span>, <span class="num">3</span>:<span class="str">"blue"</span>};</code></pre>
          </div>
          Is this one of the ways of defining an array in JavaScript?
        </div>'''
    ),
    (
        '<div class="q-text">const myArr=[1,2,[3,[4,5,6,7],8]]; const newArr=myArr.flat(2); — What is the output?</div>',
        '''<div class="q-text">What is the output of <code>newArr</code>?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> myArr = [<span class="num">1</span>, <span class="num">2</span>, [<span class="num">3</span>, [<span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>, <span class="num">7</span>], <span class="num">8</span>]];
<span class="kw">const</span> newArr = myArr.<span class="fn">flat</span>(<span class="num">2</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">var h = [45,4,9,16,25].filter((value)=>value&lt;16); document.writeln("h: " + h + "&lt;br&gt;");</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> h = [<span class="num">45</span>, <span class="num">4</span>, <span class="num">9</span>, <span class="num">16</span>, <span class="num">25</span>].<span class="fn">filter</span>((value) <span class="kw">=&gt;</span> value <span class="op">&lt;</span> <span class="num">16</span>);
document.<span class="fn">writeln</span>(<span class="str">"h: "</span> <span class="op">+</span> h <span class="op">+</span> <span class="str">"&lt;br&gt;"</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">A function <code>funcX</code> multiplies any input number by 3. For <code>Y = [1, 3, 4]</code>, the result of <code>Y.map(funcX)</code> is:</div>',
        '''<div class="q-text">A function <code>funcX</code> multiplies any input number by 3. For the array:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code>Y = [<span class="num">1</span>, <span class="num">3</span>, <span class="num">4</span>];</code></pre>
          </div>
          The result of <code>Y.map(funcX)</code> is:
        </div>'''
    ),
    (
        '<div class="q-text">What is the output of <code>var nums=[1,2,3,4]; console.log(typeof(nums));</code>?</div>',
        '''<div class="q-text">What is the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>];
console.<span class="fn">log</span>(<span class="kw">typeof</span>(nums));</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output of <code>var fruits=["Apple","Banana","Orange"]; console.log(fruits.includes("banana"));</code>?</div>',
        '''<div class="q-text">What is the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> fruits = [<span class="str">"Apple"</span>, <span class="str">"Banana"</span>, <span class="str">"Orange"</span>];
console.<span class="fn">log</span>(fruits.<span class="fn">includes</span>(<span class="str">"banana"</span>));</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What is the output? <code>var nums=[1,2,3,4]; var sum=nums.reduce((total,value)=&gt;total+value); console.log(sum);</code></div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>];
<span class="kw">var</span> sum = nums.<span class="fn">reduce</span>((total, value) <span class="kw">=&gt;</span> total <span class="op">+</span> value);
console.<span class="fn">log</span>(sum);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">What will the following JavaScript code log?  const obj={a:1, b:2}; delete obj.a; console.log(obj);</div>',
        '''<div class="q-text">What will the following JavaScript code log?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">const</span> obj = {a: <span class="num">1</span>, b: <span class="num">2</span>};
<span class="kw">delete</span> obj.<span class="prop">a</span>;
console.<span class="fn">log</span>(obj);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">Given <code>var person = { name:"Ali", age:19 };</code>, what is the output of <code>console.log(person.name + " is " + person.age);</code>?</div>',
        '''<div class="q-text">What is the output of:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">var</span> person = { name: <span class="str">"Ali"</span>, age: <span class="num">19</span> };
console.<span class="fn">log</span>(person.<span class="prop">name</span> <span class="op">+</span> <span class="str">" is "</span> <span class="op">+</span> person.<span class="prop">age</span>);</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">Which JavaScript line changes the HTML inside <code>&lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;</code> to "Hello World!"?</div>',
        '''<div class="q-text">Which JavaScript line changes the HTML inside:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">html</div></div>
            <pre><code><span class="tag">&lt;p</span> <span class="attr">id</span>=<span class="str">"demo"</span><span class="tag">&gt;</span>This is a demonstration.<span class="tag">&lt;/p&gt;</span></code></pre>
          </div>
          to "Hello World!"?
        </div>'''
    ),
    (
        '<div class="q-text">What is the difference between <code>innerHTML</code> and <code>textContent</code>?</div>',
        '''<div class="q-text">What is the difference between <code>innerHTML</code> and <code>textContent</code>?</div>'''
    ),
    (
        '<div class="q-text">What will be selected by <code>document.querySelector("#main .title")</code>?</div>',
        '''<div class="q-text">What will be selected by:
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code>document.<span class="fn">querySelector</span>(<span class="str">"#main .title"</span>)</code></pre>
          </div>
        </div>'''
    ),
    (
        '<div class="q-text">async function f() { let promise = new Promise((resolve) => setTimeout(()=>resolve(\'done!\'), 1000)); let result = await promise; console.log(result); } f();</div>',
        '''<div class="q-text">What is the output?
          <div class="code-wrap">
            <div class="code-header"><div class="code-dots"><span></span><span></span><span></span></div><div class="code-lang">js</div></div>
            <pre><code><span class="kw">async function</span> <span class="fn">f</span>() {
  <span class="kw">let</span> promise = <span class="kw">new</span> <span class="fn">Promise</span>((resolve) <span class="kw">=&gt;</span> <span class="fn">setTimeout</span>(() <span class="kw">=&gt;</span> <span class="fn">resolve</span>(<span class="str">'done!'</span>), <span class="num">1000</span>));
  <span class="kw">let</span> result = <span class="kw">await</span> promise;
  console.<span class="fn">log</span>(result);
}
<span class="fn">f</span>();</code></pre>
          </div>
        </div>'''
    )
]

for old, new in replacements:
    if old in html:
        html = html.replace(old, new)
    else:
        print(f"Warning: Could not find: {old}")

with open("js_updated.html", "w", encoding="utf-8") as f:
    f.write(html)
print("Done writing js_updated.html")
