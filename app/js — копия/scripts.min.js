"use strict";

function Man(name,floor,sex,extra,countRooms,people) {
	return {
		name: name,
		floor: floor,
		sex: sex,
		extra: extra,
		countRooms: countRooms,
		people: people
	}
};

function floor()
{
	return {
		rooms : []
	}
}

let idFloor = "";

let mansFloor = [];


let floors = document.getElementsByClassName('home__floor');
let modal = document.getElementById('modal');

// parse to json and reverse parse
// 	var str = JSON.stringify(mansFloor);
// 	var parsed = JSON.parse(str);


for (let i = 0; i < floors.length; i++) {
	mansFloor[i] = floor();
	// floors[i].onclick = function () {
	// 	idFloor = i;
	// 	let floorInput = document.getElementById("floor");
	// 	floorInput.value = 5 - idFloor;
	// }
	let rooms = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window');
	
	for(let j = 0; j < rooms.length;j++)
	{
		rooms[j].onclick = function() 
		{
			//модалки
			if(mansFloor[i].rooms.length == 0)
			{
				alert("Этот этаж пуст");
				return;
			}

			if(mansFloor[i].rooms[j] == undefined)
			{
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
		}
	}
}

//кнопка закрытия модалки пофиксить!!!!!!!!!!!!?????? 
let closeButton = document.getElementsByClassName('modal__close');
	closeButton[0].onclick = function() {
	modal.classList.remove('modal_active');
}

let button = document.getElementById("addMan");
let sex = 'male';
let sexChoice = document.querySelectorAll(".sex__choice");
for (let i = 0; i < sexChoice.length; i++) {
	sexChoice[i].onclick = function() {
		sex = sexChoice[i].getAttribute('data-sex');
	}
}


let reset = document.getElementById('resetFilter');
reset.onclick = function() {
	let resets = document.querySelectorAll('.home__floor > .home__floor_window');
	let imgs = document.querySelectorAll('.home__floor_window > img');

	for(let i = 0; i < resets.length;i++)
	{
		resets[i].setAttribute('data-filter','0');
	}

	for(let i = 0; i < imgs.length;i++)
	{
		imgs[i].style.display = 'block';
	}
}

function filtred() {
		let resets = document.querySelectorAll('.home__floor > .home__floor_window');
		let imgs = document.querySelectorAll('.home__floor_window > img');

		for(let i = 0; i < resets.length;i++)
		{
			resets[i].setAttribute('data-filter','0');
		}

		for(let i = 0; i < imgs.length;i++)
		{
			imgs[i].style.display = 'block';
		}
		
		for(let i = 0; i < imgs.length;i++)
		{
			let sexTag = imgs[i].getAttribute('data-sex');
			if(sexTag != sex)
			{
				imgs[i].style.display = 'none';
			}	
			else
			{
				imgs[i].style.display = 'block';
				imgs[i].parentNode.setAttribute('data-filter','1');
			}
		}

		let selectItem = document.getElementById('roomsCountFilter');
		let countRooms = selectItem[selectItem.selectedIndex].value;

		let checkbox = document.querySelectorAll('.filter > .checkbox');
		let floor = document.getElementById('floorFilter').value;
		let extra = '';
		for(let i = 0; i < checkbox.length;i++)
		{
			if(checkbox[i].checked) {
				if(extra != '') {	
					extra += ', <br>' + checkbox[i].value;
				}
				else {
					extra += checkbox[i].value;
				}
			}
		}

		//кол-во комнат
		for(let i = 0;i < 5;i++)
		{
			let rooms = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window');
			let imgs  = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window > img');
			for(let j = 0; j < rooms.length;j++)
			{
				if(mansFloor[i].rooms[j] == undefined || imgs.length == 0)
				{
					continue;
				}
				

				if(mansFloor[i].rooms[j].countRooms == countRooms && rooms[j].getAttribute('data-filter') == '1')
				{
					imgs[j].style.display = 'block';
					rooms[j].setAttribute('data-filter','2');
				}
				else
				{
					imgs[j].style.display = 'none';
				}

				if(mansFloor[i].rooms[j].extra == extra && rooms[j].getAttribute('data-filter') == '2')
				{
					imgs[j].style.display = 'block';
					rooms[j].setAttribute('data-filter','3');
				}
				else
				{
					imgs[j].style.display = 'none';
				}

				if(mansFloor[i].rooms[j].floor == floor && rooms[j].getAttribute('data-filter') == '3')
				{
					imgs[j].style.display = 'block';
					rooms[j].setAttribute('data-filter','4');
				}
				else
				{
					imgs[j].style.display = 'none';
				}
			}
		}
}

let sexChoices = document.querySelectorAll("#sexFilter > .sex__choice");
for (let i = 0; i < sexChoices.length; i++) {
	sexChoices[i].onclick = function() {
		sex = sexChoices[i].getAttribute('data-sex');
		if (sexChoices[0].classList.contains('sex__choice_active')) {
			sexChoices[0].classList.remove('sex__choice_active');
			sexChoices[i].classList.add('sex__choice_active');
		}
		if (sexChoices[1].classList.contains('sex__choice_active')) {
			sexChoices[1].classList.remove('sex__choice_active');
			sexChoices[i].classList.add('sex__choice_active');
		}
		filtred();
	}
}
let selectItems = document.getElementById('roomsCountFilter');
for(let i = 0; i < selectItems.length; i++)
{
	selectItems[i].onclick = filtred;
}
let checkboxs = document.querySelectorAll('.filter > .checkbox');
for(let i = 0; i < checkboxs.length; i++)
{
	checkboxs[i].onclick = filtred;
}



document.getElementById('filter').onclick = filtred;



button.onclick = function(e) {
	let idFloor = document.getElementById("floor").value;
	let name = document.getElementById("name").value;
	//value binding
	let selectItem = document.getElementById('roomsCount');
	//console.log(selectItem);
	let countRooms = selectItem[selectItem.selectedIndex].value;
	let checkbox = document.querySelectorAll('.new-man > .checkbox');
	let extra = "";
	let sex = document.getElementById('sexCheck').checked ? ('female') : ('male');
	//console.log(checkbox);
	for(let i = 0; i < checkbox.length;i++)
	{
		if(checkbox[i].checked) {
			if(extra != '') {	
				extra += ', <br>' + checkbox[i].value;
			}
			else {
				extra += checkbox[i].value;
			}
		}
	}
	selectItem = document.getElementById('mansCount');
	let people = selectItem[selectItem.selectedIndex].value;
	let floor = mansFloor[5 - idFloor];
	//добавление в этаж
		let index = floor.rooms.length;
		if(index == 3)
		{
			alert("Этаж ЗАНЯТ!");
			return;
		}
		
		floor.rooms[index] = Man(name,idFloor,sex,extra,countRooms,people);
		

		let floorDivs = document.querySelectorAll('.home__floor'+[6 - idFloor] + '> .home__floor_window');
		//console.log(floorDivs); // добавление картинки
		let img = document.createElement('img');
		img.setAttribute('src','img/' + sex + '.png');
		img.setAttribute('data-sex', sex);
		floorDivs[index].appendChild(img);
		e.preventDefault();
}
/// Tabs
let tabsLink = document.querySelectorAll('.tabs > li'),
		tabsContent = document.querySelectorAll('.tabs-content');
for (let i = 0; i < tabsLink.length; i++) {
	(function (i) {
		let link = tabsLink[i];
		
		link.onclick = function () {
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
		}
	}) (i);
}
	
// Day/Night switch
let daySwitcher = document.getElementById('togSwitcher'),
		home = document.getElementById('home');
daySwitcher.onclick = function () {
	if (home.classList.contains('night')) {		
		home.classList.remove('night')
	}
	else {
		home.classList.add('night');
	}
}