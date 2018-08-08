
//Фильтр по парамтерам
function newFilter(mansFloor, sex) {
	let selectItem = document.getElementById('roomsCountFilter');
	//кол-во комнат
	let countRooms = selectItem[selectItem.selectedIndex].value;

	//дополнительно
	let checkbox = document.querySelectorAll('.filter > .checkbox');
	let extra = [];
	let j = 0;
	for(let i = 0; i < checkbox.length;i++)	{
		if(checkbox[i].checked) {
			extra[j++] = checkbox[i].value;
		}
	}
	//выбраный этаж
	let floor = document.getElementById('floorFilter').value;
	let extraFilter = true, floorFilter = true, countRoomsFilter = true;
	
	if(extra.length == 0)
		extraFilter = false;
	if(floor == "")
		floorFilter = false;
	if(countRooms == 'Выбрать')
		countRoomsFilter = false;


	var filtred = [];
	for(let i = 0; i < mansFloor.length; i++)	{
		filtred.push(mansFloor[i].rooms.filter(function(man) {
			let comparer = 0;
			for(let k = 0; k < extra.length;k++) {
				for(let o = 0; o < man.extra.length;o++) {
					if(extra[k] == man.extra[o]) {
						comparer++;
						break;
					}
				}
			}			
			let result = true;
			if(extraFilter)
				result = result && comparer == extra.length;
			if(floorFilter)
				result = result && man.floor == floor;
			if(countRoomsFilter)
				result = result && man.countRooms == countRooms;

			return man.sex == sex && result;
		}));
	}
	for(let i = 0; i < filtred.length;i++) {
		let imgs  = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window > img');
		for(let j = 0; j < imgs.length;j++){
			imgs[j].classList.add('d-none');
		}
		for(let j = 0; j < filtred[i].length; j++) {
			let man = filtred[i][j];
			imgs[man.indexRoom].classList.remove('d-none');
		}
	}
}

function initFilter() {
	let reset = document.getElementById('resetFilter');
	reset.addEventListener('click', function() {
	let imgs = document.querySelectorAll('.home__floor_window > img');

	for(let i = 0; i < imgs.length;i++)	{
		imgs[i].classList.remove('d-none');
	}	
})

	let name = document.getElementById("name");
	let spanName = document.getElementById('nameError');
	name.addEventListener('keyup', function() {
		if(!name.value.match(/^[A-Za-zА-ЯЁа-яё]+$/)) {
			name.classList.add('input__error');
			spanName.classList.add('span__input-error');
		} else {
			name.classList.remove('input__error');
			spanName.classList.remove('span__input-error');
		}
	})
	let floorInput = document.getElementById("floor");
	let spanFloor = document.getElementById('floorError');
	floorInput.addEventListener('keyup', function() {
		if(floorInput.value > 5 || floorInput.value < 1 
			|| floorInput.value == '' || floorInput.value.match(/^[A-Za-zА-ЯЁа-яё]+$/))	{
			floorInput.classList.add('input__error');
			spanFloor.classList.add('span__input-error');
		}
		else {
			floorInput.classList.remove('input__error');
			spanFloor.classList.remove('span__input-error');
		}
	})
	let roomsInput = document.getElementById("roomsCount");
	let spanRooms = document.getElementById('roomsError');
	roomsInput.addEventListener('change', function() {
		if(roomsInput.value == 'Выбрать')	{
			roomsInput.classList.add('input__error');
			spanRooms.classList.add('span__input-error');
		}
		else {
			roomsInput.classList.remove('input__error');
			spanRooms.classList.remove('span__input-error');
		}
	})

	let mansInput = document.getElementById("mansCount");
	let spanMans = document.getElementById('peopleError');
	mansInput.addEventListener('change', function() {
		if(mansInput.value == 'Выбрать') {
			mansInput.classList.add('input__error');
			spanMans.classList.add('span__input-error');
		}
		else {
			mansInput.classList.remove('input__error');
			spanMans.classList.remove('span__input-error');
		}
	})
}

export {newFilter, initFilter};