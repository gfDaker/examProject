"use strict";
import {newFilter, initFilter} from "./filter.js";
import {floor, addLodger} from "./lodgers.js";

let mansFloor = [];
initFilter();

let floors = document.getElementsByClassName('home__floor');
let modal = document.getElementById('modal');

for (let i = 0; i < floors.length; i++) {
	mansFloor[i] = floor();

	let rooms = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window');
	
	for(let j = 0; j < rooms.length;j++) {
		rooms[j].addEventListener('click', function() {	
			if(mansFloor[i].rooms.length == 0) {
				alert("Этот этаж пуст");
				return;
			}

			if(mansFloor[i].rooms[j] == undefined) {
				alert("Эта комната пуста");
				return;
			}

			modal.classList.add("modal_active");
			let modalSex = document.getElementById('modalSex'),
					modalFloor = document.getElementById('modalFloor'),
					modalRooms = document.getElementById('modalRooms'),
					modalExtra = document.getElementById('modalExtra'),
					modalPeople = document.getElementById('modalPeople'),
					modalName = document.getElementById('modalName');
			
			
			let man = mansFloor[i].rooms[j];
			modalSex.innerHTML = man.sex == 'male' ? ('Мужской') : ("Женский");
			document.getElementById('imgSex').setAttribute('src','img/' + man.sex + '.png');
			modalFloor.innerHTML = man.floor;
			modalRooms.innerHTML = man.countRooms;
			modalExtra.innerHTML = man.extra;
			modalPeople.innerHTML = man.people;
			modalName.innerHTML = man.name;
		})
	}
}
let closeButton = document.getElementsByClassName('modal__close');
	closeButton[0].addEventListener('click', function() {
		modal.classList.remove('modal_active');
	})

let sex = 'male';
let sexChoice = document.querySelectorAll(".sex__choice");
for (let i = 0; i < sexChoice.length; i++) {
	sexChoice[i].addEventListener('click', function() {
		sex = sexChoice[i].getAttribute('data-sex');
	})
}

let sexChoices = document.getElementById('sexFilter');
sexChoices.addEventListener('click', function () {
sex = sexChoices.checked ? ('female') : ('male');
newFilter(mansFloor, sex);
});
let selectItems = document.getElementById('roomsCountFilter');
selectItems.addEventListener('change', function(){
	newFilter(mansFloor, sex);
});

let checkboxs = document.querySelectorAll('.filter > .checkbox');
for(let i = 0; i < checkboxs.length; i++) {
checkboxs[i].addEventListener('click', function(){
	newFilter(mansFloor, sex);
});
}

document.getElementById('floorFilter').addEventListener('keyup', function(){
	newFilter(mansFloor, sex);
});

let button = document.getElementById("addMan");
button.addEventListener('click', function() {
	mansFloor = addLodger(mansFloor);
})

/// Tabs
let tabsLink = document.querySelectorAll('.tabs > li'),
		tabsContent = document.querySelectorAll('.tabs-content');
for (let i = 0; i < tabsLink.length; i++) {
	(function (i) {
		let link = tabsLink[i];
		
		link.addEventListener('click', function() {
			if (tabsLink[0].classList.contains('tabs__btn_active')) {
				tabsLink[0].classList.remove('tabs__btn_active');
				tabsLink[i].classList.add('tabs__btn_active');
			}
			if (tabsLink[1].classList.contains('tabs__btn_active')) {
				tabsLink[1].classList.remove('tabs__btn_active');
				tabsLink[i].classList.add('tabs__btn_active');
			}
			for (let j = 0; j < tabsContent.length; j++) {
				if (tabsContent[j].classList.contains('tabs-content_active'))	{
					tabsContent[j].classList.remove('tabs-content_active');
				}			
			}
			tabsContent[i].classList.add('tabs-content_active');
		});
	}) (i);
}
	
// Day/Night switch
let daySwitcher = document.getElementById('togSwitcher'),
		home = document.getElementById('home');
daySwitcher.addEventListener('click', function() {
	if (home.classList.contains('night')) {		
		home.classList.remove('night')
	}
	else {
		home.classList.add('night');
	}
})

window.addEventListener('load', function() {
	var lodgers = localStorage.getItem('lodgers');
	mansFloor = JSON.parse(lodgers);
	if(mansFloor == null)	{
		mansFloor =[];
		for(let i = 0; i < 5;i++)		{
			mansFloor[i] = floor();
		}
		return;
	}
	for(let i = mansFloor.length - 1; i >= 0; i--) {
		let floorDivs = document.querySelectorAll('.home__floor'+[1 + i] + '> .home__floor_window');
		for(let j = 0; j < mansFloor[i].rooms.length;j++)	{
			let sex = mansFloor[i].rooms[j].sex;
			let img = document.createElement('img');
			img.setAttribute('src','img/' + sex + '.png');
			img.setAttribute('data-sex', sex);
			floorDivs[j].appendChild(img);
		}
	}
})

window.addEventListener('unload', function() {
	var value = JSON.stringify(mansFloor);
	this.localStorage.setItem('lodgers', value);
})
