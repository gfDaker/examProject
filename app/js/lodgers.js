
function Man(name,floor,sex,extra,countRooms,people,indexRoom) {
	return {
		name: name,
		floor: floor,
		sex: sex,
		extra: extra,
		countRooms: countRooms,
		people: people,
		indexRoom: indexRoom
	}
};

function floor() {
	return {
		rooms : []
	}
}

function addLodger(mansFloor) {
	let name = document.getElementById("name").value;
	if(!name.match(/^[A-Za-zА-ЯЁа-яё]+$/)) {
		return;
	}
	let sex = document.getElementById('sexCheck').checked ? ('female') : ('male');
	let idFloor = document.getElementById("floor").value;
	if(idFloor > 5 || idFloor < 1 || idFloor == '')	{
		return;
	}	
	let selectItem = document.getElementById('roomsCount');
	let countRooms = selectItem[selectItem.selectedIndex].value;
	if(countRooms == 'Выбрать')	{
		return;
	}
	let checkbox = document.querySelectorAll('.new-man > .checkbox');
	let extra = [];
	let j = 0;
	for(let i = 0; i < checkbox.length;i++)	{
		if(checkbox[i].checked) {
			extra[j++] = checkbox[i].value;
		}
	}
	selectItem = document.getElementById('mansCount');
	let people = selectItem[selectItem.selectedIndex].value;
	if(people == 'Выбрать')	{
		return;
	}
	let floor = mansFloor[5 - idFloor];
		let index = floor.rooms.length;
		if(index == 3) {
			alert("Этаж ЗАНЯТ!");
			return;
		}		
		let floorDivs = document.querySelectorAll('.home__floor'+[6 - idFloor] + '> .home__floor_window');
		let img = document.createElement('img');
		img.setAttribute('src','img/' + sex + '.png');
		img.setAttribute('data-sex', sex);
		floorDivs[index].appendChild(img);

		floor.rooms[index] = Man(name,idFloor,sex,extra,countRooms,people,index);
		return mansFloor;
}
export {Man, floor, addLodger};