// source: iconify ->  https://iconify.design/

// navigation menu
// const hamburgerIcon = (<svg className='svg-hamburger' xmlns="http://www.w3.org/2000/svg" width="4vh" height="4vh" viewBox="0 0 16 16">
//                             <path className='svg-path-hamburger' fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
//                        </svg>)

// const closeIcon = (<svg className='svg-close' xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 24 24">
//                         <path className='svg-path-close' fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m7 7l10 10M7 17L17 7"/>
//                   </svg>)


// https://fontawesome.com/


//header title
const pawIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/paw?f=classic&s=solid',
      className: "fa-solid fa-paw",
      html: (<i class="fa-solid fa-paw"></i>)
}

const pawIconL = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/paw?f=classic&s=solid&rt=rotate-270',
      className: "fa-solid fa-paw fa-rotate-270",
      html: (<i class="fa-solid fa-paw fa-rotate-270"></i>)
}

const pawIconR = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/paw?f=classic&s=solid&rt=rotate-90',
      className: "fa-solid fa-paw fa-rotate-90",
      html: (<i class="fa-solid fa-paw fa-rotate-90"></i>)
}

//header nav links
const homeIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/house?f=classic&s=solid',
      className: "fa-solid fa-house",
      html: (<i class="fa-solid fa-house"></i>)
}

//mobile menu
const closeIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/xmark?f=classic&s=solid',
      className: "fa-solid fa-xmark",
      html: (<i class="fa-solid fa-xmark"></i>)
}

const hamburgerIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/bars?f=classic&s=solid',
      className: "fa-solid fa-bars",
      html: (<i class="fa-solid fa-bars"></i>)
}

// Home Page

const catIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/cat?f=classic&s=solid',
      className: "fa-solid fa-cat",
      html: (<i class="fa-solid fa-cat"></i>)
}

const dogIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/dog?f=classic&s=solid',
      className: "fa-solid fa-dog",
      html: (<i class="fa-solid fa-dog"></i>)
}

const boneIcon = {
      source: 'FontAwesome',
      url: 'https://fontawesome.com/icons/bone?f=classic&s=solid',
      className: "fa-solid fa-bone",
      html: (<i class="fa-solid fa-bone"></i>)
}





export { 
      hamburgerIcon,
      pawIconR,
      pawIconL, 
      closeIcon, 
      homeIcon, 
      pawIcon, 
      catIcon, 
      dogIcon,
      boneIcon
 };