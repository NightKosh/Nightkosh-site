var App =(function(){
	var field = new Array(),
		PointCount,//колличество точек
		delay = 100,//интервал между прорисовками
		key = -1,//нажатая кнопка
		DW, DH, Xpixel, Ypixel;//ширина, высота, и размеры "пикселей"
	
	function get_size(){//Получаем размеры "поля" и пикселя
		var height = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		var width = self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var x = 66/55;//66 : 1 - отсутп сверху, 61 - карта, 4 - информация снизу
		if (height/width >= x){
			DW = Math.floor(width/55)*55;
			DH = DW*x;
		} else {
			DH = Math.floor(height/66)*66;
			DW = DH/x;
		}
		
		Ypixel = Math.floor(DH/66);
		Xpixel = Math.floor(DW/55);
	}
	
	get_size();
	
	var DPoint = [//перекрёстки
					[12, 2], [42, 2],
					[2, 10], [12, 10], [18, 10], [24, 10], [30, 10], [36, 10], [42, 10], [52, 10],
					[12, 16], [42, 16],
				
					[12, 28], [18, 28], [36, 28], [42, 28],
					[18, 34], [36, 34],
					[12, 40], [18, 40], [36, 40], [42, 40],
				
					[12, 46], [18, 46], [36, 46], [42, 46],
				
					[6, 52], [48, 52],
					[24, 58], [30, 58]
				];
	var SPoint = [// 4 "особых" перекрёстка
					[24, 22], [30, 22],
					[24, 46], [30, 46]
				];
					
	function init_level(){
		PointCount = 244;
		field = [
			/*
				Поле
				0 - стена, 1 - таблетка, 2 - большая таблетка
				3 - пусто, 4 - нельзя
				6, 7 - переход на противоположную сторону тоннеля
				8 - точка перед входом в дом
			*/
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0, 4, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0, 0],//граница
			[0, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,0, 4, 0,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4, 0],
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 4,0, 4, 0,4,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,4, 0],//первый ряд
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,0, 4, 0,4,3, 4, 4,4,4, 4, 4,4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 3,4, 0],
	
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 4, 0,4,1, 4, 0,0,0, 0, 0,0,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 4, 1,4, 0],//грань верхних блоков 1
			[0, 4,3,4, 0, 4,4,4, 4, 4,0,4, 3, 4,0,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 0,4,3, 4, 0,4,4, 4, 4,4,0, 4, 3,4, 0],
			[0, 4,2,4, 0, 4,4,4, 4, 4,0,4, 1, 4,0,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 0,4,1, 4, 0,4,4, 4, 4,4,0, 4, 2,4, 0],//2ряд в верх.блоке 1
			[0, 4,3,4, 0, 4,4,4, 4, 4,0,4, 3, 4,0,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 0,4,3, 4, 0,4,4, 4, 4,4,0, 4, 3,4, 0],
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 4, 1,4, 0],//грань Верх.болока 1
	
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 3,4, 0],
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,3,1, 3, 1,4, 0 ],//второй верхний ряд
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,3,4, 4, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,4, 4, 3,4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 3,4, 0],
	
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 4,1,4, 0, 0,0,0, 0, 0,0, 0, 0,0,0, 0, 0,0,0, 4, 1,4,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 4, 1,4, 0],//верх.блок. 2
			[0, 4,3,4, 0, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,0, 4, 3,4, 0],
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0,4, 0, 4,1,4, 0, 0,0,0, 0, 0,0, 4, 0,0,0, 0, 0,0,0, 4, 1,4,0, 4, 0,4,1, 4, 0,0,0, 0, 0,0,0, 4, 1,4, 0],//верх.блок. 2 низ
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 3, 4,0,4, 0, 4,3,4, 4, 4,4,4, 4, 4,0, 4, 0,4,4, 4, 4,4,4, 4, 3,4,0, 4, 0,4,3, 4, 4,4,4, 4, 4,4,4, 4, 3,4, 0],
	
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 4,0,4, 0, 4,1,3, 1, 3,1,3, 1, 4,0, 4, 0,4,1, 3, 1,3,1, 3, 1,4,0, 4, 0,4,1, 3, 1,3,1, 3, 1,3,1, 3, 1,4, 0],//3 ряд
			[0, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,0,4, 0, 4,4,4, 4, 4,4,4, 3, 4,0, 4, 0,4,3, 4, 4,4,4, 4, 4,4,0, 4, 0,4,3, 4, 4,4,4, 4, 4,4,4, 4, 4,4, 0],
	
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0,4, 0, 0,0,0, 0, 0,0,4, 3, 4,0, 4, 0,4,3, 4, 0,0,0, 0, 0,0,0, 4, 0,4,1, 4, 0,0,0, 0, 0,0,0, 0, 0,0, 0],//конец верхнего блока
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 0,0,0, 0, 0,0,4, 3, 4,0, 0, 0,4,3, 4, 0,0,0, 0, 0,0,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],//загибок закончен
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,4,4, 4, 4,4,4, 3, 4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
	
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 4,3,3, 3, 3,3,3, 3, 3,3, 8, 3,3,3, 3, 3,3,3, 3, 3,4,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 4, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,4, 4, 3,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 4,3,4, 0, 0,0,0, 0, 5,5, 5, 5,5,0, 0, 0,0,0, 4, 3,4,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 0, 0,0, 0],//верх тоннеля
			[4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 4,4, 4],
	//28
			[4, 6,3,3, 3, 3,3,3, 3, 3,3,3, 1, 3,3,3, 3, 3,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,3,3, 3, 3,3,1, 3, 3,3,3, 3, 3,3,3, 3, 3,7, 4],
	
	
			[4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,4, 4, 4,4,3, 4, 4,4,4, 4, 4,4,4, 4, 4,4, 4],
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,0, 0, 0,4,1, 4, 0,0,0, 0, 0,0,0, 0, 0,0, 0],//верх тоннеля
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,0, 4, 3,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 4,3,4, 0, 0,0,0, 0, 0,0, 0, 0,0,0, 0, 0,0,0, 4, 3,4,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 4, 4,4,4, 4, 4,4, 4, 4,4,4, 4, 4,4,4, 4, 3,4,0, 4, 0,4,3, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 4,3,3, 3, 3,3,3, 3, 3,3, 3, 3,3,3, 3, 3,3,3, 3, 3,4,0, 4, 0,4,1, 4, 0,4,4, 4, 4,4,4, 4, 4,4, 4],
	
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 4, 4,4,4, 3, 4,4, 4, 4,4 ,3 ,4,4,4 ,4 ,4,3,4 ,0 ,4,0,4 ,3 ,4,0,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4],
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 1, 4,0,4, 0, 4,3,4, 0, 0,0,0, 0, 0,0, 0, 0,0 ,0 ,0,0,0 ,0 ,4,3,4 ,0 ,4,0,4 ,1 ,4,0,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4],//загибок закончен
			[4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0,4, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4 ,4 ,4,4,4 ,0 ,4,3,4 ,0 ,4,0,4 ,3 ,4,0,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4],
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 4,3,4, 0, 0,0,0, 0, 0,0, 4, 0,0 ,0 ,0,0,0 ,0 ,4,3,4 ,0 ,0,0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0],//конец верхнего блока
	
			[0, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,3,4, 4, 4,4,4, 4, 4,0, 4, 0,4 ,4 ,4,4,4 ,4 ,4,3,4 ,4 ,4,4,4 ,3 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,0],
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 4,0, 4, 0,4 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,4 ,0],//4 ряд
	
	
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,0, 4, 0,4 ,3 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,3 ,4,4,4 ,4 ,4,4,4 ,4 ,4,3,4 ,0], //начало
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 4, 0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,0,0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,4,1,4 ,0],
			[0, 4,3,4, 0, 4,4,4, 4, 4,0,4, 3, 4,0,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0, 4, 0,4 ,3 ,4,0,4 ,4 ,4,4,4 ,4 ,4,0,4 ,3 ,4,0,4 ,4 ,4,4,4 ,0 ,4,3,4 ,0],
			[0, 4,1,4, 0, 0,0,0, 0, 4,0,4, 1, 4,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 0, 0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,0,0,4 ,1 ,4,0,4 ,0 ,0,0,0 ,0 ,4,1,4 ,0],
			[0, 4,3,4, 4, 4,4,4, 0, 4,0,4, 3, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4, 4, 4,4 ,3 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,3 ,4,0,4 ,0 ,4,4,4 ,4 ,4,3,4 ,0], //конец
	
			[0, 4,2,3, 1, 3,1,4, 0, 4,0,4, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,3, 3, 3,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,4,0,4 ,0 ,4,1,3 ,1 ,3,2,4 ,0],//ряд
			[0, 4,4,4, 4, 4,3,4, 0, 4,0,4, 3, 4,4,4, 4, 4,3,4, 4, 4,4,4, 4, 4,4, 4, 4,4 ,4 ,4,4,4 ,4 ,4,3,4 ,4 ,4,4,4 ,3 ,4,0,4 ,0 ,4,3,4 ,4 ,4,4,4 ,0],
	
			[0, 0,0,0, 0, 4,1,4, 0, 4,0,4, 1, 4,0,0, 0, 4,1,4, 0, 0,0,0, 0, 0,0, 0, 0,0 ,0 ,0,0,0 ,0 ,4,1,4 ,0 ,0,0,4 ,1 ,4,0,4 ,0 ,4,1,4 ,0 ,0,0,0 ,0],//выступ
			[4, 4,4,4, 0, 4,3,4, 0, 4,0,4, 3, 4,0,4, 0, 4,3,4, 0, 4,4,4, 4, 4,4, 4, 4,4 ,4 ,4,4,4 ,0 ,4,3,4 ,0 ,4,0,4 ,3 ,4,0,4 ,0 ,4,3,4 ,0 ,4,4,4 ,4],
			[0, 0,0,0, 0, 4,1,4, 0, 0,0,4, 1, 4,0,4, 0, 4,1,4, 0, 0,0,0, 0, 0,0, 4, 0,0 ,0 ,0,0,0 ,0 ,4,1,4 ,0 ,4,0,4 ,1 ,4,0,0 ,0 ,4,1,4 ,0 ,0,0,0 ,0],
			[0, 4,4,4, 4, 4,3,4, 4, 4,4,4, 3, 4,0,4, 0, 4,3,4, 4, 4,4,4, 4, 4,0, 4, 0,4 ,4 ,4,4,4 ,4 ,4,3,4 ,0 ,4,0,4 ,3 ,4,4,4 ,4 ,4,3,4 ,4 ,4,4,4 ,0],//конец выступа
	
	
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 4,0,4, 0, 4,1,3, 1, 3,1,3, 1, 4,0, 4, 0,4 ,1 ,3,1,3 ,1 ,3,1,4 ,0 ,4,0,4 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,4 ,0],//ряд
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 0, 4,4,4, 4, 4,4,4, 3, 4,0, 4, 0,4 ,3 ,4,4,4 ,4 ,4,4,4 ,0 ,4,0,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,3,4 ,0],
	
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 4, 0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,4,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,4,1,4 ,0],//начало
			[0, 4,3,4, 0, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,0,4, 3, 4,0, 4, 0,4 ,3 ,4,0,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,0 ,4,3,4 ,0],
			[0, 4,1,4, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,4, 1, 4,0, 0, 0,4 ,1 ,4,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,4,1,4 ,0],
			[0, 4,3,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 3, 4,4, 4, 4,4 ,3 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,3,4 ,0],//конец
	
	
			[0, 4,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1,3, 1, 3,1, 3, 1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,3 ,1 ,3,1,4 ,0],//последний ряд
			[0, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4,4, 4, 4,4, 4, 4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,4 ,4,4,4 ,0],
	
			[0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0,0, 0, 0,0, 0, 0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0 ,0,0,0 ,0],
		];
	}
		
	function DrawArc(x, y, r, a1, a2){//рисование "куска круга"(иль целого)
		context.beginPath();
		context.arc(x, y, r, a1, a2, true);
		context.closePath();
		context.fill();
	}
	
	function DrawWall(y, x){//рисуем "кусок" стены
		context.fillStyle = '#0000ff';
		context.fillRect(Xpixel*x, Ypixel*(y + 1), Xpixel, Ypixel);
	}
	
	function DrawPoint(y, x){//рисуем точку
		context.fillStyle = '#ffffff';
		DrawArc(Xpixel*(x + 0.5), Ypixel*(y + 1.5), Xpixel/2, 0, Math.PI*2);
	}
	
	function DrawBigPoint(y, x){//рисуем "красную точку"
		context.fillStyle = '#ff0000';
		DrawArc(Xpixel*(x + 0.5), Ypixel*(y + 1.5), Xpixel, 0, Math.PI*2);
	}
	
	function DrawCreap(y, x, color, state){//рисуем призрака
		if (state != 3){//если он не съеден рисуем тело
			context.fillStyle = color;
			DrawArc(Xpixel*(x + 0.5), Ypixel*(y + 1.5), Xpixel*1.25, 0, Math.PI*2);
		}

		//рисуем глаза и прочести
		context.fillStyle = '#ffffff';
		DrawArc(Xpixel*x, Ypixel*(y + 0.5), Xpixel/3, 0, Math.PI*2);
		DrawArc(Xpixel*(x + 1), Ypixel*(y + 0.5), Xpixel/3, 0, Math.PI*2);
		
		context.fillStyle = '#000000';
		DrawArc(Xpixel*x, Ypixel*(y + 0.5), Xpixel/5, 0, Math.PI*2);
		DrawArc(Xpixel*(x + 1), Ypixel*(y + 0.5), Xpixel/5, 0, Math.PI*2);
	}
	
	function DrawPacman(){//рисуем пакмэна
		context.fillStyle = '#ffff00';
		DrawArc(Xpixel*(pacman.X + 0.5), Ypixel*(pacman.Y + 1.5), Xpixel*1.25, pacman.angle + pacman.rotate, pacman.angle + Math.PI + pacman.rotate);//верх
		DrawArc(Xpixel*(pacman.X + 0.5), Ypixel*(pacman.Y + 1.5), Xpixel*1.25, Math.PI - pacman.angle + pacman.rotate, Math.PI*2 - pacman.angle + pacman.rotate);//низ
	}
	
	function DrawInfo(){
		context.fillStyle = '#ffff00';
		DrawArc(Xpixel*2, DH - Ypixel*2, Xpixel*1.25, 0.78539, 3.92698);//верх
		DrawArc(Xpixel*2, DH - Ypixel*2, Xpixel*1.25, 2.35619, 5.49778);//низ
		
		context.font = Ypixel*2 + "px Calibri";
		context.fillStyle = '#ffffff';
		context.fillText("  x " + pacman.life + "      Уровень  " + pacman.level + "      Очки  " + pacman.points, Xpixel*3, DH - Ypixel*1.5);
	}
	
	var Pacman = function(){
		this.name = "Pacman";
		this.X;
		this.Y;
		this.Direction;
		/*
			1 - лево
			2 - верх
			3- право
			4-низ
		*/
		this.angle;//Math.PI/4;
		this.rotate;
		this.alive = true;//состояние (жив иль нет)
		this.delay = delay;
		this.life = 2;
		this.points = 0;
		this.level = 1;
		var x;
		
		this.start = function(){
			this.X = 27;
			this.Y = 46;
			this.Direction = 1;
			this.angle = 0.78539;//Math.PI/4;
			this.rotate = 0;
			
			x = 0.52359;//Math.PI/6;
			key = -1;//сбрасываем "нажатую" кнопку, если была нажата
			
			var creap = this;
			this.thread = setInterval(function(){
				creap.run();
			}, this.delay);
		}
		
		this.run = function(){
			check_key();//проверяем на нажатость "кнопок"
			//изменяем угол "открытости рта"
			this.angle -= x;
			x *= -1;
			//ходим
			switch (this.Direction){
				case 1:
					if (field[this.Y][this.X - 1] != 4)
						this.X--;
					break;
				case 2:
					if (field[this.Y - 1][this.X] != 4)
						this.Y--;
					break;
				case 3:
					if (field[this.Y][this.X + 1] != 4)
						this.X++;
					break;
				case 4:
					if (field[this.Y + 1][this.X] != 4)
						this.Y++;
					break;
			}
			//глядим куда попали
			switch (field[this.Y][this.X]){
				case 1:
					PointCount--;//кушаем точку
					field[this.Y][this.X] = 3;//заменяем её на пустоту
					this.points += 100;
					break;
				case 2:
					PointCount--;
					field[this.Y][this.X] = 3;
					this.points += 300;
					//пугаем призраков
					blinky.scare();
					pinky.scare();
					inky.scare();
					clyde.scare();
					break;
				case 6://перемещаемся на противоположную сторону тоннеля
					this.X = 53;
					break;
				case 7://перемещаемся на противоположную сторону тоннеля
					this.X = 2;
					break;
			}
			
			//смотрим скушали ли мы кого, или кто-нибудь нас
			this.check_meeting(blinky);
			this.check_meeting(pinky);
			this.check_meeting(inky);
			this.check_meeting(clyde);
			
			if (PointCount === 0)
				this.next_level();
		};
		
		this.check_meeting = function(creap){//смотрим скушали ли мы кого, или кто-нибудь нас
			if ((creap.X === this.X) && (creap.Y === this.Y))
				switch (creap.state){
					case 1:
						this.die();
						break;
					case 2:
						creap.eat_up();
						this.points += 1000;
						break;
				}
		}
		
		this.die = function(){
			if (this.life !== 0){
				stop_creap_timers();
				this.life--;
				var creap = this;
				this.Rthread = setTimeout(function(){
					creap.start();
					blinky.start();
					pinky.start();
					inky.start();
					clyde.start();
				}, 1000);
			} else {
				this.alive = false;
			}
		}
		
		this.next_level = function(){
			stop_creap_timers();
			this.level++;
			var creap = this;
			this.Rthread = setTimeout(function(){
				init_level();
				creap.start();
				blinky.start();
				pinky.start();
				inky.start();
				clyde.start();
			}, 1000);
		}
		
		key = -1;//сбрасываем "нажатую" кнопку
	}
	
	var Blinky = function(){
		this.name = "Blinky";
		this.X;
		this.Y;
		this.Direction;
		/*
			1 - лево
			2 - верх
			3- право
			4-низ
		*/
		this.state = 1;
		/*
			0 - спит
			1 - обычное
			2 - напуган
			3 - съеден
		*/
		this.def_color = "#ff0000";
		this.color;
		this.delay = delay*0.95;
		
		this.start = function(){
			this.X = 27;
			this.Y = 22;
			this.Direction = 1;
			this.state = 1;
			this.color = this.def_color;
			
			var Creap = this;
			this.thread = setInterval(function(){
				Creap.run();
			}, this.delay);
		}
		
		this.run = function(){
			if (this.state !== 2 && this.Y === 28 && (this.X === 10 || this.X === 44)){
				// если входит тоннель (выходит)
				this.move();
				var Creap = this;
				clearInterval(this.thread);
				switch (this.X){
					case 9://входим слева и замедляем скорость
						this.thread = setInterval(function(){
							Creap.run();
						}, this.delay*2);
						break;
					case 45://входим справа и замедляем скорость
						this.thread = setInterval(function(){
							Creap.run();
						}, this.delay*2);
						break;
					case 11://выходим слева и восстанавливаем скорость
						this.thread = setInterval(function(){
							Creap.run();
						}, this.delay);
						break;
					case 43://выходим справа и восстанавливаем скорость
						this.thread = setInterval(function(){
							Creap.run();
						}, this.delay);
						break;
				}
			} else {
				var q = true;
				//проверяем позицию на нахождение на "перекрёстке"
				for (var i = 0; i < 30; i += 1){
					if (this.X === DPoint[i][0] && this.Y === DPoint[i][1]){
						this.state == 2 ? this.rdecision() : this.Direction = this.decision();
						q = false;
						break;
					}
				}
				if (q){
					//тоже самое, но для 4х "особых" позиций
					for (i = 0; i < 4; i += 1)
						if (this.X === SPoint[i][0] && this.Y === SPoint[i][1]){
							this.state == 2 ? this.rdecision() : this.Direction = this.Sdecision();
							q = false;
							break;
						}
				}
				if (q && this.end_way(this.Direction)){
					//если тупик то поворачиваем
					this.rdecision();
				}
		
				this.move();//делаем ход
				
				//если в конце тоннеля, то переносим на другую сторону
				switch (field[this.Y][this.X]){
					case 6:
						this.X = 53;
						break;
					case 7:
						this.X = 2;
						break;
				}
			}
			if ((this.X === pacman.X) && (this.Y === pacman.Y)){
				//проверяем догнали ли пакмэна, если "призрак" напуган то он съедается иначе кушаем пакмэна
				this.state == 2 ? this.eat_up() : pacman.die();//pacman.alive = false;
			}
		}
		
		this.end_way = function(Direction){//смотрим можно ли двигаться дальше
			switch (Direction){
				case 1:
					return field[this.Y][this.X - 1] != 4 ? false : true;
					break;
				case 2:
					return field[this.Y - 1][this.X] != 4 ? false : true;
					break;
				case 3:
					return field[this.Y][this.X + 1] != 4 ? false : true;
					break;
				case 4:
					return field[this.Y + 1][this.X] != 4 ? false : true;
					break;
			}
		}
	
		this.change_way = function(){//меняем направление на противоположное
			this.Direction += 2;
			if (this.Direction > 4){
				this.Direction -= 4;
			}
		}
		
		this.rdecision = function(){//меняем направление движения на случайное(кроме противоположного)
			var a = [1, 2, 3, 4],//массив "направлений" движения
				i = 0;
			switch (this.Direction){//убираем "противоположное"
				case 1:
					a.splice(2, 1);
					break;
				case 2:
					a.splice(3, 1);
					break;
				case 3:
					a.splice(0, 1);
					break;
				case 4:
					a.splice(1, 1);
					break;
			}
			
			while (i < a.length)//перебираем оставшиеся на наличие "тупиковых" и удаляем их
				this.end_way(a[i]) ? a.splice(i, 1) : i++;
			this.Direction = a[Math.floor(Math.random()*a.length)];//выбираем случайный вариант из оставшихся
		}
		
		this.shortway = function(RX, RY){//выбираем кратчайший путь из возможных, путь считается из длинны прямой от "следующей" от призрака точки до указанного места
			var a = [
						[1, 10000],
						[2, 10000],
						[3, 10000],
						[4, 10000]
					],//массив "направлений" движения
				i = 0;
			
			switch (this.Direction){//убираем "противоположное"
				case 1:
					a.splice(2, 1);
					break;
				case 2:
					a.splice(3, 1);
					break;
				case 3:
					a.splice(0, 1);
					break;
				case 4:
					a.splice(1, 1);
					break;
			}
			
			while (i < a.length)//перебираем оставшиеся на наличие "тупиковых" и удаляем их
				if (this.end_way(a[i][0]))
					a.splice(i, 1);
				else {//а для "нетупиковых" высчитываем "расстояние"
					switch (a[i][0]){
						case 1:
							a[i][1] = Math.pow(RY - this.Y, 2) + Math.pow(RX - (this.X - 1), 2);
							break;
						case 2:
							a[i][1] = Math.pow(RY - (this.Y - 1), 2) + Math.pow(RX - this.X, 2);
							break;
						case 3:
							a[i][1] = Math.pow(RY - this.Y, 2) + Math.pow(RX - (this.X + 1), 2);
							break;
						case 4:
							a[i][1] = Math.pow(RY - (this.Y + 1), 2) + Math.pow(RX - this.X, 2);
							break;
					}
					i++;
				}
				
			i = 1;//отыскиваем направление с наименьшим расстоянием
			var Direction = a[0][0];
			while (i < a.length){
				if (a[i][1] < a[i - 1][1])
					Direction = a[i][0];
				i++;
			}
			return Direction;
		}
	
		this.decision = function(){//здесь, в принципе, не нужна, но переопределяется у других призраков
			return this.shortway(pacman.X, pacman.Y);
		}
	
		this.Sdecision = function(){// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			var a = 0,
				b = 0;
	
			if (this.Direction === 4){
				if (field[this.Y][this.X + 1] != 4)
					a = Math.abs((pacman.Y - this.Y)*(pacman.X - (this.X + 1)));
				if (field[this.Y][this.X - 1] != 4)
					b = Math.abs((pacman.Y - this.Y)*(pacman.X - (this.X - 1)));
				/*if (field[this.Y][this.X + 1] != 4)
					a = Math.pow(pacman.Y - this.Y, 2) + Math.pow(pacman.X - (this.X + 1), 2);
				if (field[this.Y][this.X - 1] != 4)
					b = Math.pow(pacman.Y - this.Y, 2) + Math.pow(pacman.X - (this.X - 1), 2);
	*/
				if (a === 0 && b === 0)
					return pacman.X > this.X ? 3 : 1;
				return a <= b ? 3 : 1;
			}
	
			return this.Direction;
		}
		
		this.move = function(){//двигаемся
			switch (this.Direction) {
				case 1:
					this.X -= 1;
					break;
				case 2:
					this.Y -= 1;
					break;
				case 3:
					this.X += 1;
					break;
				case 4:
					this.Y += 1;
					break;
			}
		}
	
		this.scare = function(){//выполняется когда пакмэн есть красную таблетку
			if (this.state == 1){
				//если призрак "активен"(не спит, не напуган и не съеден)
				var Creap = this;
				this.state = 2;//меняем состояние на "испуганное"
				this.color = "#0000ff";//меняем цвет
				this.change_way();//меняем направление на противоположное
			
				//чистим таймеры и снова "запускаем" бег, с пониженной скоростью
				clearInterval(this.thread);
				this.thread = setInterval(function(){
					Creap.run();
				}, 200);
				
				//выставляем таймер для восстановления "нормального" состояния через 10 секунд
				clearTimeout(this.Rthread);
				this.Rthread = setTimeout(function(){
					Creap.restore();
				}, 10000);
			}
		}
		
		this.restore = function(){//восстанавливаем исходное состояние
			var Creap = this;
			this.color = this.def_color;
			this.state = 1;
			
			clearInterval(this.thread);
			this.thread = setInterval(function(){
				Creap.run();
			}, this.delay);
		}

		this.eat_up = function(){//призрак съеден
			this.state = 3;//меняем состояние на "съеден"
			//очищаем таймеры
			clearTimeout(this.Rthread);
			clearInterval(this.thread);
			
			var Creap = this;
			this.thread = setInterval(function(){
				Creap.run_away();//убегаем
			}, 50);
		}
		
		this.run_away = function(){//убегаем к дому, когда призрак скушан, всё тоже самое что и для обычного "бега"
			var q = true;
			for (var i = 0; i < 30; i += 1)
				if (this.X === DPoint[i][0] && this.Y === DPoint[i][1]){
					this.Direction = this.shortway(27, 22);
					q = false;
					break;
				}
			if (q){
				for (i = 0; i < 4; i += 1)
					if (this.X === SPoint[i][0] && this.Y === SPoint[i][1]){
						this.Direction = this.shortway(27, 22);
						q = false;
						break;
					}
			}
			if (q && this.end_way(this.Direction)){
				this.rdecision();
			}
	
			this.move();
			
			switch (field[this.Y][this.X]){
				case 6:
					this.X = 53;
					break;
				case 7:
					this.X = 2;
					break;
				case 8:
					var Creap = this;
					clearInterval(this.thread);
					this.thread = setInterval(function(){
						Creap.go_home();
					}, this.delay);
					break;
			}
		}
	
		this.go_home = function(){//входим в "дом"
			if (this.Y !== 28){
				this.Y += 1;
			} else {
				var Creap = this;
				clearInterval(this.thread);
				
				this.state = 0;//меняем состояние на спящее
				this.color = this.def_color;//меняем цвет на "обычный"
				//ставим таймер на 3 секунды для выхода из дома
				this.Rthread = setTimeout(function(){
					Creap.thread = setInterval(function(){
						Creap.go_out();
					}, this.delay);
				}, 3000);
			}
		}
		
		this.go_out = function(){//выход из "дома"
			if (this.X !== 27){//сдвигаемся по "Х" к выходу
				this.X > 27 ? this.X -= 1 : this.X += 1;
			} else {//"поднимаемся"
				if (this.Y !== 22) {
					this.Y -= 1;
				} else {//если вышли то начинаем "ходить"
					clearTimeout(this.thread);
					var Creap = this;
					this.state = 1;
					this.thread = setInterval(function(){
						Creap.run();
					}, this.delay);
				}
			}
		}
	}
	
	var Pinky = function(){
		this.name = "Pinky";
		this.def_color = "#ff9899";
		this.delay = delay;
	
		this.start = function(){
			this.X = 27;
			this.Y = 28;
			this.Direction = 1;
			this.state = 0;
			this.color = this.def_color;
			
			var Creap = this;
			this.Rthread = setTimeout(function(){
				Creap.wait();
			}, 1000);
		}
		
		this.wait = function(){//"ожидание" перед самым началом хода
			var Creap = this;
			this.thread = setInterval(function(){
				Creap.go_out();
			}, this.delay);
		}
	
		this.decision = function(){
			switch (this.Direction) {
				case 1:
					if (pacman.Direction === 3 && this.Y === pacman.Y && this.X > pacman.X)
						return Math.floor(Math.random()*2) === 0 ? 2 : 4;
				case 2:
					if (pacman.Direction === 4 && this.X === pacman.X && this.Y > pacman.Y)
						return Math.floor(Math.random()*2) === 0 ? 1 : 3;
				case 3:
					if (pacman.Direction === 1 && this.Y === pacman.Y && this.X < pacman.X)
						return Math.floor(Math.random()*2) === 0 ? 2 : 4;
				case 4:
					if (pacman.Direction === 2 && this.X === pacman.X && this.Y < pacman.Y)
						return Math.floor(Math.random()*2) === 0 ? 1 : 3;
			}

			switch (pacman.Direction) {
				case 1:
					return this.shortway(pacman.X - 8, pacman.Y);
				case 2:
					return this.shortway(pacman.X, pacman.Y - 8);
				case 3:
					return this.shortway(pacman.X + 8, pacman.Y);
				case 4:
					return this.shortway(pacman.X, pacman.Y + 8);
			}
		}
	}
	
	var Inky = function(){
		this.name = "Inky";
		this.def_color = "#63fcfa";
		this.delay = delay;
		
		this.start = function(){
			this.X = 23;
			this.Y = 28;
			this.Direction = 1;
			this.state = 0;
			this.color = this.def_color;
			
			var Creap = this;
			this.thread = setInterval(function(){
				Creap.wait();
			}, this.delay);
		}
		
		this.wait = function(){//ждём пока не останется 214 точек и после начинаем "ходить"
			if (PointCount <= 214){
				clearInterval(this.thread);
				
				var Creap = this;
				this.thread = setInterval(function(){
					Creap.go_out();
				}, this.delay);
			}
		}
	
		this.decision = function(){
			switch (pacman.Direction) {
				case 1:
					return this.shortway(Math.abs(pacman.X - 4 - blinky.X)*2, Math.abs(pacman.Y - blinky.Y)*2);
					break;
				case 2:
					return this.shortway(Math.abs(pacman.X - blinky.X)*2, Math.abs(pacman.Y - 4 - blinky.Y)*2);
					break;
				case 3:
					return this.shortway(Math.abs(pacman.X + 4 - blinky.X)*2, Math.abs(pacman.Y - blinky.Y)*2);
					break;
				case 4:
					return this.shortway(Math.abs(pacman.X - blinky.X)*2, Math.abs(pacman.Y + 4 - blinky.Y)*2);
					break;
			}
		}
	}
	
	var Clyde = function(){
		this.name = "Clyde";
		this.def_color = "#ff9900";
		this.delay = delay;
		
		this.start = function(){
			this.X = 31;
			this.Y = 28;
			this.Direction = 1;
			this.state = 0;
			this.color = this.def_color;
			
			var Creap = this;
			this.thread = setInterval(function(){
				Creap.wait();
			}, this.delay);
		}
		
		this.wait = function(){
			if (PointCount <= 160){
				clearInterval(this.thread);
				
				var Creap = this;
				this.thread = setInterval(function(){
					Creap.go_out();
				}, this.delay);
			}
		}
	
		this.decision = function(){
			if (Math.abs(pacman.X - this.X) <= 16 || Math.abs(pacman.Y - this.Y) <= 16)
				return this.shortway(0, 65);
			else
				return this.shortway(pacman.X, pacman.Y);
		}
	}	
	
	//создаём элементы и устанавливаем "параметры"
	var canvas = document.createElement("canvas");
	canvas.height = DH;
	canvas.width = DW;
	var textNode = document.createTextNode("Вы используете устаревший браузер! К сожалению он не поддерживает HTML5.");
	canvas.appendChild(textNode);
	document.getElementById("canvas_div").appendChild(canvas);
	
	if (canvas && canvas.getContext) {
		var context = canvas.getContext('2d');//получаем контекст
		if (context){//и, если всё прошло удачно "инициализируем всё))"
			context.lineWidth = 1;
			
			init_level();
			
			Pinky.prototype = new Blinky();
			Inky.prototype  = new Blinky();
			Clyde.prototype = new Blinky();
			
			var pacman = new Pacman(),
				blinky = new Blinky()
				pinky = new Pinky(),
				inky  = new Inky(),
				clyde = new Clyde();
			
			//"запускаем"
			pacman.start();
			blinky.start();
			pinky.start();
			inky.start();
			clyde.start();
			
			//создаём "поток" для рисования
			var draw_thread = setInterval(function(){
				draw();
			}, delay);
		}
	}
	
	function draw(){//рисуем
		var i, j;
		context.clearRect(0, 0, canvas.width, canvas.height);//очищаем поле

		if (pacman.alive){//если игра ещё не закончена, то "поэлементно" прорисовываем поле
			for (i = 0; i < 61; i += 1){
				for (j = 0; j < 55; j += 1){
					switch (field[i][j]) {
						case 0 :
							DrawWall(i, j);//кусок стены
							break;
						case 1 :
							DrawPoint(i, j);//маленькая "таблетка"
							break;
						case 2 :
							DrawBigPoint(i, j);//юольшая(красная) "таблетка"
							break;
						case 5 :
							//вход в "дом"
							context.fillStyle = '#ffffff';
							context.fillRect(Xpixel*j, Ypixel*(i + 0.33 + 1), Xpixel, Ypixel/3);
							break;
					}
				}
			}
			//рисуем пакмэна и призраков
			DrawPacman();
			DrawInfo();
			DrawCreap(blinky.Y, blinky.X, blinky.color, blinky.state);
			DrawCreap(pinky.Y, pinky.X, pinky.color, pinky.state);
			DrawCreap(inky.Y, inky.X, inky.color, inky.state);
			DrawCreap(clyde.Y, clyde.X, clyde.color, clyde.state);
		} else {
			//если игра закончена то выводим соответствующее сообщение
			context.font = Ypixel*6 + "px Calibri";
			context.fillStyle = '#ff0000';
			context.fillText("Вы проиграли", Xpixel*9, DH/2);
			
			//останавливаем все "таймеры"
			clearInterval(draw_thread);
			stop_creap_timers();
		}
	}
	
	function stop_creap_timers(){
		clearInterval(pacman.thread);
		clearInterval(blinky.thread);
		clearInterval(pinky.thread);
		clearInterval(inky.thread);
		clearInterval(clyde.thread);
		try {
			clearTimeout(blinky.Rthread);
			clearTimeout(pinky.Rthread);
			clearTimeout(inky.Rthread);
			clearTimeout(clyde.Rthread);
		} catch (e) {
			
		}
	}
	
	function key_event(e){
		key = e.keyCode;
	}
	
	function check_key(){//получаем нажатую кнопку
		switch (key){
			case 37://стрелка в лево
				if (field[pacman.Y][pacman.X - 1] != 4){
					pacman.Direction = 1;
					pacman.rotate = 0;
				}
				break;
			case 38://стрелка вверх
				if (field[pacman.Y - 1][pacman.X] != 4){
					pacman.Direction = 2;
					pacman.rotate = 1.57079;//Math.PI/2;
				}
				break;
			case 39://стрелка вправо
				if (field[pacman.Y][pacman.X + 1] != 4){
					pacman.Direction = 3;
					pacman.rotate = Math.PI;
				}
				break;
			case 40://стрелка вниз
				if (field[pacman.Y + 1][pacman.X] != 4){
					pacman.Direction = 4;
					pacman.rotate = -1.57079;//-Math.PI/2;
				}
				break;
		}
	}
	
	document.addEventListener('keydown', key_event, false);
})();