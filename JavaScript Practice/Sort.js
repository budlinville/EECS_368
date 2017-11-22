function mergeSort(arr) {
	if (arr.length == 1) {		//base case
		return arr;
	}
	
	if (arr.length % 2 == 1) {
		var arr1 = [arr.length /2];
		var arr2 = [(arr.length / 2) + 1]
	} else {
		var arr1 = [arr.length /2];
		var arr2 = [arr.length /2];
	}
	
	
	var midIndex = Math.ceil(arr.length / 2);
	
	for (var i = 0; i < (arr.length / 2); i++) {
		if ((i + midIndex) >= arr.length) {
			arr1[i] = arr[i];
		}else {
			arr1[i] = arr[i];
			arr2[i] = arr[i + midIndex];
		}
	}
	
	arr1 = mergeSort(arr1);
	arr2 = mergeSort(arr2);
	
	return merge(arr1, arr2);
}

function merge(arr1, arr2) {
	var i = 0;		//for arr1
	var j = 0;		//for arr2
	var k = 0;		//for arr3
	
	var mergedArrLength = arr1.length + arr2.length;
	var mergedArr = [mergedArrLength];
	
	while (i < arr1.length && j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			mergedArr[k] = arr1[i];
			i++;
			k++
		} else {
			mergedArr[k] = arr2[j];
			j++;
			k++;
		}
	}
	
	while (j < arr2.length) {
		mergedArr[k] = arr2[j];
		j++;
		k++;
	}
			
	while (i < arr1.length) {
		mergedArr[k] = arr1[i];
		i++;
		k++;
	}
	
	return mergedArr;
}