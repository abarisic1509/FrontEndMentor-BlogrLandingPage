'use strict';
//mobile nav
const initMainNav = () => {

    const navigation = document.querySelector('#nav-items');
    const navigationItems = navigation.querySelectorAll('a');
    const menuBtnOpen = document.querySelector('#menu-btn-open');
    const menuBtnClose = document.querySelector('#menu-btn-close');

    const open = () => {
        menuBtnOpen.setAttribute('aria-expanded', 'true');
        menuBtnOpen.classList.add('hide');
        menuBtnClose.classList.add('show');
        navigation.classList.add('is-visible');
        
        setTimeout(() => navigation.classList.add('is-active'));
    };

    const close = () => {
        menuBtnOpen.setAttribute('aria-expanded', 'false');
        menuBtnOpen.classList.remove('hide');
        menuBtnClose.classList.remove('show');
        navigation.classList.remove('is-active');
    };

    const handleClosure = event => !navigation.contains(event.target) && close();

    menuBtnOpen.addEventListener('click', event => {
        event.stopPropagation();
        const expanded = JSON.parse(menuBtnOpen.getAttribute('aria-expanded'));
        expanded ? close() : open();
    });
    menuBtnClose.addEventListener('click', event => {
        event.stopPropagation();
        const expanded = JSON.parse(menuBtnOpen.getAttribute('aria-expanded'));
        expanded ? close() : open();
    });

    navigation.addEventListener('transitionend', event => {
        event.target === navigation && 
        !event.target.classList.contains('is-active') &&
        navigation.classList.remove('is-visible');
    });


    document.addEventListener('click', handleClosure);
    document.addEventListener('focusin', handleClosure);

    navigationItems.forEach(link => link.addEventListener('click', () => close()));
};
initMainNav();

//dropdown menus
const dropdownContainer = document.querySelector('.dropdown-container')
const dropdownItems = dropdownContainer.querySelectorAll('.dropdown-item')
const dropdownBtns = dropdownContainer.querySelectorAll('.dropdown-btn')
const dropdownLists = dropdownContainer.querySelectorAll('.dropdown-list')
console.log(dropdownItems)
dropdownBtns.forEach((btn) => {
    btn.addEventListener('click', toggleDropdown)
})
dropdownBtns.forEach((btn) => {
    btn.addEventListener('mouseenter', showDropdown)
})   
dropdownLists.forEach((list) => {
    list.addEventListener('mouseleave', hideDropdown)
})
dropdownBtns.forEach((btn) => {
    btn.addEventListener('click', toggleDropdown)
})
function toggleDropdown(e) {
        const targetBtn = e.target
        let listIsOpen = JSON.parse(targetBtn.getAttribute('aria-expanded'))
        const targetList = targetBtn.getAttribute('aria-controls')
        const targetListElement = dropdownContainer.querySelector(`#${targetList}`)
        
        hideAllDropdowns()
        
        if(listIsOpen === false) {
            targetBtn.setAttribute('aria-expanded', true)
            targetListElement.classList.add('open')
            targetListElement.setAttribute('aria-expanded', true)
        } else {
            targetBtn.setAttribute('aria-expanded', false)
            targetListElement.classList.remove('open')
            targetListElement.setAttribute('aria-expanded', false)
        }
}
function showDropdown(e) {
    const targetBtn = e.target
    const targetList = targetBtn.getAttribute('aria-controls')
    const targetListElement = dropdownContainer.querySelector(`#${targetList}`)
    hideAllDropdowns()
    targetBtn.setAttribute('aria-expanded', true)
    targetListElement.classList.add('open')
    targetListElement.setAttribute('aria-expanded', true)
    clearTimeout()
}
function hideDropdown(e) {
    const targetListElement = e.target
    const targetBtn = targetListElement.previousElementSibling


    setTimeout(() => {
        targetBtn.setAttribute('aria-expanded', false)
        targetListElement.classList.remove('open')
        targetListElement.setAttribute('aria-expanded', false)
    }, 700)
}

function hideAllDropdowns() {
    dropdownBtns.forEach((btn)=> {
        btn.setAttribute('aria-expanded', false)
    })
    dropdownLists.forEach((list)=> {
        list.classList.remove('open')
        list.setAttribute('aria-expanded', false)
    })
}
