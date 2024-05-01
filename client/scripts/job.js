// document.addEventListener('DOMContentLoaded', function () {
//     // Button to open post form
//     var postBtn = document.getElementById('postBtn');
//     var postForm = document.getElementById('postForm');
//     var closeModal = document.getElementsByClassName('close')[0];

//     postBtn.addEventListener('click', function () {
//         postForm.style.display = 'block';
//     });

//     closeModal.onclick = function () {
//         postForm.style.display = 'none';
//     };

//     window.onclick = function (event) {
//         if (event.target == postForm) {
//             postForm.style.display = 'none';
//         }
//     };

//     // Form submit event
//     var jobForm = document.getElementById('jobForm');
//     var jobList = document.getElementById('jobList');
//     var jobEntries = JSON.parse(localStorage.getItem('jobEntries')) || [];

//     function updateLocalStorage() {
//         localStorage.setItem('jobEntries', JSON.stringify(jobEntries));
//     }

//     // Load existing entries from local storage
//     jobEntries.forEach(function (entryData) {
//         var jobEntry = document.createElement('div');
//         jobEntry.classList.add('job-entry');
//         jobEntry.innerHTML = entryData;

//         jobList.appendChild(jobEntry);
//     });

//     jobForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         // Get form values
//         var jobTitle = document.getElementById('jobTitle').value.trim();
//         var jobDescription = document.getElementById('jobDescription').value.trim();
//         var jobLocation = document.getElementById('jobLocation').value.trim();
//         var ownerName = document.getElementById('ownerName').value.trim();
//         var contactInfo = document.getElementById('contactInfo').value.trim();

//         // Check if any of the required fields are empty
//         if (!jobTitle || !jobDescription || !jobLocation || !ownerName || !contactInfo) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         // Create job entry
//         var jobEntry = document.createElement('div');
//         jobEntry.classList.add('job-entry');
//         jobEntry.innerHTML = `
//             <div class="details">
//                 <h3>${jobTitle}</h3>
//                 <p>Description: ${jobDescription}</p>
//                 <p>Location: ${jobLocation}</p>
//                 <p>Owner: ${ownerName}</p>
//                 <p>Contact: ${contactInfo}</p>
//             </div>
//         `;

//         // Append job entry to job list
//         jobList.appendChild(jobEntry);

//         // Add entry to local storage
//         jobEntries.push(jobEntry.innerHTML);
//         updateLocalStorage();

//         // Reset form
//         jobForm.reset();
//         postForm.style.display = 'none';
//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    // Button to open post form
    var postBtn = document.getElementById('postBtn');
    var postForm = document.getElementById('postForm');
    var closeModal = document.getElementsByClassName('close')[0];

    postBtn.addEventListener('click', function () {
        postForm.style.display = 'block';
    });

    closeModal.onclick = function () {
        postForm.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == postForm) {
            postForm.style.display = 'none';
        }
    };

    // Form submit event
    var jobForm = document.getElementById('jobForm');
    var jobList = document.getElementById('jobList');
    var jobEntries = JSON.parse(localStorage.getItem('jobEntries')) || [];

    function updateLocalStorage() {
        localStorage.setItem('jobEntries', JSON.stringify(jobEntries));
    }

    // Load existing entries from local storage
    jobEntries.forEach(function (entryData) {
        var jobEntry = document.createElement('div');
        jobEntry.classList.add('job-entry');
        jobEntry.innerHTML = entryData;

        // Add delete button to each job entry
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            // Remove job entry from jobList
            jobList.removeChild(jobEntry);
            // Remove job entry from jobEntries array
            var index = jobEntries.indexOf(jobEntry.innerHTML);
            if (index !== -1) {
                jobEntries.splice(index, 1);
                updateLocalStorage();
            }
        });

        jobEntry.appendChild(deleteBtn);
        jobList.appendChild(jobEntry);
    });

    jobForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        var jobTitle = document.getElementById('jobTitle').value.trim();
        var jobDescription = document.getElementById('jobDescription').value.trim();
        var jobLocation = document.getElementById('jobLocation').value.trim();
        var ownerName = document.getElementById('ownerName').value.trim();
        var contactInfo = document.getElementById('contactInfo').value.trim();

        // Check if any of the required fields are empty
        if (!jobTitle || !jobDescription || !jobLocation || !ownerName || !contactInfo) {
            alert('Please fill in all required fields');
            return;
        }

        // Create job entry
        var jobEntry = document.createElement('div');
        jobEntry.classList.add('job-entry');
        jobEntry.innerHTML = `
            <div class="details">
                <h3>${jobTitle}</h3>
                <p>Description: ${jobDescription}</p>
                <p>Location: ${jobLocation}</p>
                <p>Owner: ${ownerName}</p>
                <p>Contact: ${contactInfo}</p>
            </div>
        `;

        // Add delete button to job entry
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function () {
            // Remove job entry from jobList
            jobList.removeChild(jobEntry);
            // Remove job entry from jobEntries array
            var index = jobEntries.indexOf(jobEntry.innerHTML);
            if (index !== -1) {
                jobEntries.splice(index, 1);
                updateLocalStorage();
            }
        });

        jobEntry.appendChild(deleteBtn);

        // Append job entry to job list
        jobList.appendChild(jobEntry);

        // Add entry to local storage
        jobEntries.push(jobEntry.innerHTML);
        updateLocalStorage();

        // Reset form
        jobForm.reset();
        postForm.style.display = 'none';
    });
});
