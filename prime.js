// Your Name
// Date
// CPSC 3750
// Programming Exam #1
// Grade level you completed: A

document.getElementById("startButton").addEventListener("click", generateLists);

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("numberInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            generateLists();
        }
    });
    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function generatePrimeList(limit) {
    let primes = [];
    for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) primes.push(i);
    }
    return primes;
}

function generateNonPrimeList(limit) {
    let nonPrimes = [1];
    for (let i = 2; i <= limit; i++) {
        if (!isPrime(i)) nonPrimes.push(i);
    }
    return nonPrimes;
}

function calculateSum(list) {
    return list.reduce((sum, num) => sum + num, 0);
}

function generateLists() {
    let input = document.getElementById("numberInput").value;
    let number = parseInt(input);
    
    if (isNaN(number) || number < 1) {
        alert("Please enter a valid positive integer.");
        return;
    }

    let primes = generatePrimeList(number);
    let nonPrimes = generateNonPrimeList(number);
    
    displayList("primeList", primes, true);
    displayList("nonPrimeList", nonPrimes, false);
}

function displayList(elementId, numbers, isPrime) {
    let listElement = document.getElementById(elementId);
    listElement.innerHTML = "";
    
    numbers.forEach(num => {
        let li = document.createElement("li");
        li.textContent = num;
        
        if (!isPrime) {
            li.addEventListener("mouseover", function () {
                this.textContent = `${num} (Divisors: ${getDivisors(num).join(", ")})`;
            });
            li.addEventListener("mouseout", function () {
                this.textContent = num;
            });
        }
        listElement.appendChild(li);
    });
    
    let sumButton = document.createElement("button");
    sumButton.textContent = "SUM";
    sumButton.addEventListener("click", function () {
        this.textContent = `SUM: ${calculateSum(numbers)}`;
    });
    listElement.appendChild(sumButton);

    let sortButton = document.createElement("button");
    sortButton.textContent = "Sort Asc";
    sortButton.addEventListener("click", function () {
        let sorted = [...numbers].sort((a, b) => a - b);
        if (sortButton.textContent === "Sort Asc") {
            sortButton.textContent = "Sort Desc";
        } else {
            sorted.reverse();
            sortButton.textContent = "Sort Asc";
        }
        displayList(elementId, sorted, isPrime);
    });
    listElement.appendChild(sortButton);
}

function getDivisors(num) {
    let divisors = [];
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) divisors.push(i);
    }
    return divisors;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
