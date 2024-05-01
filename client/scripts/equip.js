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

    // Update image label with file name
    var imageLabel = document.getElementById('imageLabel');
    var equipmentImage = document.getElementById('equipmentImage');

    equipmentImage.addEventListener('change', function () {
        if (this.files.length > 0) {
            imageLabel.textContent = this.files[0].name;
        } else {
            imageLabel.textContent = 'Choose Image';
        }
    });

    // Form submit event
    var equipmentForm = document.getElementById('equipmentForm');
    var equipmentList = document.getElementById('equipmentList');

    equipmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        var equipmentName = document.getElementById('equipmentName').value.trim();
        var ownerName = document.getElementById('ownerName').value.trim();
        var contactInfo = document.getElementById('contactInfo').value.trim();

        // Check if any of the required fields are empty
        if (!equipmentName || !ownerName || !contactInfo) {
            alert('Please fill in all required fields');
            return;
        }

        // Get image file
        var fileInput = document.getElementById('equipmentImage');
        var image = fileInput.files[0];
        var imageUrl = '';

        if (image) {
            imageUrl = URL.createObjectURL(image);
        }

        // Create equipment entry
        var equipmentEntry = document.createElement('div');
        equipmentEntry.classList.add('equipment-entry');
        equipmentEntry.innerHTML = `
            <img src="${imageUrl}" alt="Equipment Image">
            <div class="details">
                <h3>${equipmentName}</h3>
                <p>Owner: ${ownerName}</p>
                <p>Contact: ${contactInfo}</p>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Append equipment entry to equipment list
        equipmentList.appendChild(equipmentEntry);

        // Reset form
        equipmentForm.reset();
        postForm.style.display = 'none';
        imageLabel.textContent = 'Choose Image';
    });

    // Delete functionality
    equipmentList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            var entry = e.target.closest('.equipment-entry');
            var image = entry.querySelector('img');

            // Revoke image URL to release memory
            URL.revokeObjectURL(image.src);

            // Remove equipment entry from the list
            entry.remove();
        }
    });

    // Search functionality
    var searchInput = document.getElementById('searchInput');
    var searchBtn = document.getElementById('searchBtn');

    searchBtn.addEventListener('click', function () {
        var searchText = searchInput.value.trim().toLowerCase();

        // Loop through each equipment entry
        var equipmentEntries = equipmentList.getElementsByClassName('equipment-entry');
        var found = false;

        for (var i = 0; i < equipmentEntries.length; i++) {
            var equipmentName = equipmentEntries[i].querySelector('h3').textContent.trim().toLowerCase();
            if (equipmentName.includes(searchText)) {
                equipmentEntries[i].style.display = 'block';
                found = true;
            } else {
                equipmentEntries[i].style.display = 'none';
            }
        }

        if (!found) {
            alert('No matching equipment found');
        }
    });
});




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

//     // Update image label with file name
//     var imageLabel = document.getElementById('imageLabel');
//     var equipmentImage = document.getElementById('equipmentImage');

//     equipmentImage.addEventListener('change', function () {
//         if (this.files.length > 0) {
//             imageLabel.textContent = this.files[0].name;
//         } else {
//             imageLabel.textContent = 'Choose Image';
//         }
//     });

//     // Form submit event
//     var equipmentForm = document.getElementById('equipmentForm');
//     var equipmentList = document.getElementById('equipmentList');

//     // Load existing entries from local storage
//     var equipmentEntries = JSON.parse(localStorage.getItem('equipmentEntries')) || [];
//     equipmentEntries.forEach(function (entryData) {
//         var equipmentEntry = document.createElement('div');
//         equipmentEntry.classList.add('equipment-entry');
//         equipmentEntry.innerHTML = entryData;
//         equipmentList.appendChild(equipmentEntry);
//     });

//     equipmentForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         // Get form values
//         var equipmentName = document.getElementById('equipmentName').value.trim();
//         var ownerName = document.getElementById('ownerName').value.trim();
//         var contactInfo = document.getElementById('contactInfo').value.trim();

//         // Check if any of the required fields are empty
//         if (!equipmentName || !ownerName || !contactInfo) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         // Get image file
//         var fileInput = document.getElementById('equipmentImage');
//         var image = fileInput.files[0];
//         var imageUrl = '';

//         if (image) {
//             imageUrl = URL.createObjectURL(image);
//         }

//         // Create equipment entry
//         var equipmentEntry = document.createElement('div');
//         equipmentEntry.classList.add('equipment-entry');
//         equipmentEntry.innerHTML = `
//             <img src="${imageUrl}" alt="Equipment Image">
//             <div class="details">
//                 <h3>${equipmentName}</h3>
//                 <p>Owner: ${ownerName}</p>
//                 <p>Contact: ${contactInfo}</p>
//                 <button class="delete-btn">Delete</button>
//             </div>
//         `;

//         // Append equipment entry to equipment list
//         equipmentList.appendChild(equipmentEntry);

//         // Add entry to local storage
//         equipmentEntries.push(equipmentEntry.innerHTML);
//         localStorage.setItem('equipmentEntries', JSON.stringify(equipmentEntries));

//         // Reset form
//         equipmentForm.reset();
//         postForm.style.display = 'none';
//         imageLabel.textContent = 'Choose Image';
//     });

//     // Delete functionality
//     equipmentList.addEventListener('click', function (e) {
//         if (e.target.classList.contains('delete-btn')) {
//             var entry = e.target.closest('.equipment-entry');
//             var image = entry.querySelector('img');

//             // Revoke image URL to release memory
//             URL.revokeObjectURL(image.src);

//             // Remove equipment entry from the list
//             entry.remove();

//             // Remove entry from local storage
//             equipmentEntries = equipmentEntries.filter(function (item) {
//                 return item !== entry.innerHTML;
//             });
//             localStorage.setItem('equipmentEntries', JSON.stringify(equipmentEntries));
//         }
//     });

//     // Search functionality
//     var searchInput = document.getElementById('searchInput');
//     var searchBtn = document.getElementById('searchBtn');

//     searchBtn.addEventListener('click', function () {
//         var searchText = searchInput.value.trim().toLowerCase();

//         // Loop through each equipment entry
//         var equipmentEntries = equipmentList.getElementsByClassName('equipment-entry');
//         var found = false;

//         for (var i = 0; i < equipmentEntries.length; i++) {
//             var equipmentName = equipmentEntries[i].querySelector('h3').textContent.trim().toLowerCase();
//             if (equipmentName.includes(searchText)) {
//                 equipmentEntries[i].style.display = 'block';
//                 found = true;
//             } else {
//                 equipmentEntries[i].style.display = 'none';
//             }
//         }

//         if (!found) {
//             alert('No matching equipment found');
//         }
//     });
// });
