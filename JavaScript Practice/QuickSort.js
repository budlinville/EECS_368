function quickSort (arr) {
	return doQuickSort(arr, 0, (arr.length - 1), true);
}

function doQuickSort(arr, s, e, outsideRecurse) {		//s = starting point of array, end = ending point of array
	var pivotValue = arr[e];
	
	var pivotPoint = s; 	//pivot index
	var temp = 0;
	
	for (var i = s; i < e; i++) {
		if (arr[i] < pivotValue) {
			temp = arr[pivotPoint];				//swap values
			arr[pivotPoint] = arr[i];
			arr[i] = temp;
			
			pivotPoint++;
		}
	}
		
	if (pivotPoint == s && arr[s] > arr[e]) {
		arr[e] = arr[s];
		arr[s] = pivotValue;
	} else {
		temp = arr[pivotPoint];
		arr[pivotPoint] = arr[e];
		arr[e] = temp;
	}
	
	doQuickSort(arr, s, pivotPoint - 1, false);
	doQuickSort(arr, pivotPoint + 1, e, false);
	
	if (outsideRecurse) {
		return arr;
	}
}