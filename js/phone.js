const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  // 1. get phone container
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new cards 
  phoneContainer.textContent = '';
  
  // display show all button if there are more than 12 phones 
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    // show all button
    showAllContainer.classList.remove('hidden');
  }
  else{
    showAllContainer.classList.add('hidden');
  }
//   console.log('is show all ', isShowAll);
  // display only 12 phones if not show all 
  if(!isShowAll){
  phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 p-4 shadow-xl border-2 border-blue-200`;
    // 3. set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center w-full">
            <button onclick="handleShowDetails('${phone.slug}')" id="btn-show-details" class="btn btn-primary w-1/2">Show Details</button>
          </div>
        </div>
        `;
    // 4. append main container
    phoneContainer.appendChild(phoneCard);
    
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

// handle show detail button
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    // console.log(data);
    showPhoneDetails(phone);
}
// show phone details function
const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" class="mx-auto">
    <h3 class="font-bold text-3xl mb-2">${phone.name}</h3>
    <div class="space-y-3">
        <p><span class="font-bold">Brand:</span>${phone?.brand}</p>
        <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">Slug:</span> ${phone?.slug}</p>
        <p><span class="font-bold">Release Date:</span> ${phone?.releaseDate}</p>
        <p><span class="font-bold">GPS:</span> ${phone.others?.GPS || 'No GPS available'}</p>
        <!--<p><span class="font-bold">GPS:</span> ${phone.others?.GPS ? phone.others.GPS: 'No GPS available in this device'}</p> -->
    </div>
    `
    // show the modal 
    show_modal_details.showModal()
}


// handle search button 
const handleSearch = (isShowAll) =>{
    // console.log('search handle')
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    loadPhone(searchFieldText, isShowAll);
    // console.log(searchFieldText);
}



// handle search recap
const handleSearch2 = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner-container');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


// handle show all 
const handleShowAll = () => {
    //  console.log('show all');
    handleSearch(true);

}

// loadPhone();