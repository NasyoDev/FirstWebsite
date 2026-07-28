var signupView = document.getElementById('signupView');
var loginView = document.getElementById('loginView');
var authCard = document.getElementById('authCard');
var signupForm = document.getElementById('signupForm');
var loginForm = document.getElementById('loginForm');
var signupStatus = document.getElementById('signupStatus');
var loginStatus = document.getElementById('loginStatus');

var registeredUser = null;

signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  signupStatus.textContent = '';
  signupStatus.className = 'status-msg';

  var name = document.getElementById('su-name');
  var email = document.getElementById('su-email');
  var age = document.getElementById('su-age');
  var pass = document.getElementById('su-pass');
  var confirm = document.getElementById('su-confirm');
  var country = document.getElementById('su-country');
  var genderInputs = signupForm.querySelectorAll('input[name="su-gender"]');

  var valid = true;

  if (name.value.trim().length < 2) {
    document.getElementById('err-name').textContent = 'Please enter your full name.';
    name.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-name').textContent = '';
    name.classList.remove('invalid');
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(email.value.trim()) == false) {
    document.getElementById('err-email').textContent = 'Please enter a valid email address.';
    email.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-email').textContent = '';
    email.classList.remove('invalid');
  }

  var ageNum = Number(age.value);
  if (age.value == '' || isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
    document.getElementById('err-age').textContent = 'Age must be a number between 13 and 120.';
    age.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-age').textContent = '';
    age.classList.remove('invalid');
  }

  if (pass.value.length < 6) {
    document.getElementById('err-pass').textContent = 'Password must be at least 6 characters.';
    pass.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-pass').textContent = '';
    pass.classList.remove('invalid');
  }

  if (confirm.value == '' || confirm.value != pass.value) {
    document.getElementById('err-confirm').textContent = 'Passwords do not match.';
    confirm.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-confirm').textContent = '';
    confirm.classList.remove('invalid');
  }

  if (country.value == '') {
    document.getElementById('err-country').textContent = 'Please select a country.';
    country.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-country').textContent = '';
    country.classList.remove('invalid');
  }

  var genderVal = '';
  for (var i = 0; i < genderInputs.length; i++) {
    if (genderInputs[i].checked) {
      genderVal = genderInputs[i].value;
    }
  }

  if (genderVal == '') {
    document.getElementById('err-gender').textContent = 'Please select a gender.';
    valid = false;
  } else {
    document.getElementById('err-gender').textContent = '';
  }

  if (valid == false) {
    return;
  }

  registeredUser = {
    name: name.value.trim(),
    email: email.value.trim(),
    age: ageNum,
    password: pass.value,
    country: country.value,
    gender: genderVal
  };

  signupStatus.textContent = 'Signup successful!';
  signupStatus.classList.add('success');

  setTimeout(function() {
    signupView.style.display = 'none';
    loginView.style.display = 'block';
  }, 900);
});

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  loginStatus.textContent = '';
  loginStatus.className = 'status-msg';

  var email = document.getElementById('li-email');
  var pass = document.getElementById('li-pass');

  var valid = true;

  if (email.value.trim() == '') {
    document.getElementById('err-li-email').textContent = 'Email is required.';
    email.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-li-email').textContent = '';
    email.classList.remove('invalid');
  }

  if (pass.value == '') {
    document.getElementById('err-li-pass').textContent = 'Password is required.';
    pass.classList.add('invalid');
    valid = false;
  } else {
    document.getElementById('err-li-pass').textContent = '';
    pass.classList.remove('invalid');
  }

  if (valid == false) {
    return;
  }

  if (!registeredUser || email.value.trim().toLowerCase() != registeredUser.email.toLowerCase() || pass.value != registeredUser.password) {
    loginStatus.textContent = 'Incorrect email or password.';
    loginStatus.classList.add('error');
    return;
  }

  loginStatus.textContent = 'Login successful!';
  loginStatus.classList.add('success');

  setTimeout(function() {
    authCard.remove();
  }, 3000);
});

var todoInput = document.getElementById('todoInput');
var todoAddBtn = document.getElementById('todoAddBtn');
var todoList = document.getElementById('todoList');
var todoCount = document.getElementById('todoCount');

var tasks = [];

function renderTasks() {
  todoList.innerHTML = '';
  var remainingCount = 0;

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    if (task.done == false) {
      remainingCount = remainingCount + 1;
    }

    var li = document.createElement('li');
    if (task.done) {
      li.classList.add('done');
    }

    var span = document.createElement('span');
    span.textContent = task.text;

    (function(index) {
      span.addEventListener('click', function() {
        tasks[index].done = !tasks[index].done;
        renderTasks();
      });
    })(i);

    var delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    (function(index) {
      delBtn.addEventListener('click', function() {
        tasks.splice(index, 1);
        renderTasks();
      });
    })(i);

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  }

  todoCount.textContent = remainingCount;
}

function addTask() {
  var text = todoInput.value.trim();
  if (text == '') return;
  tasks.push({ text: text, done: false });
  todoInput.value = '';
  renderTasks();
}

todoAddBtn.addEventListener('click', addTask);
todoInput.addEventListener('keydown', function(e) {
  if (e.key == 'Enter') {
    e.preventDefault();
    addTask();
  }
});

renderTasks();