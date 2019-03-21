if ((angular.module == null ) || (angular.module == undefined)) {
	alert ("Browser not supporting AngularJS");
	alert("if 'Compatibility View settings' are enabled for the site, please disable the same and try again");
}else{
	var app = angular
			.module("FIApp",['ngRoute'])
			.controller("FIAppController", FIAppController);
}


function FIAppController($scope,$http) {
	
	var j;
	var selItem = "Home";
	$scope.content;
	$scope.QItems = [];
	$scope.hist = ["Home"];
	$scope.hist1 = [];
	$scope.modules = ["FI","Connect24"];
	$scope.questions=["Choose one of the following modules :","Choose FI module where error is seen :","Which part of C24 is the error seen :","FINCOREQuestion","FinlistvalQuestion","CBCQuestion","UNISERQuestion","CSISQuestion","Below are common set of errors seen mostly:","ATM-Timeout Question","ATM-Timeout(Online) Question","ATM-Timeout(offline) Question","SIGALARM Question"];
	$scope.Question = $scope.questions[0];
	$scope.selOpt = 0;
	$scope.hideProceed = false;
	$scope.indexMap;
	$scope.msg;
	$scope.disableProceed = true;
	$scope.intial = false;
	$scope.obj;
	
	$scope.changefontsize = function(fontDiff) {
		var elem = document.getElementById("HelpBox");
		var elem1 = document.getElementById("QuestBox");
		if ( fontDiff == 0 ) {
			elem.style.fontSize = 12 + "px";
			elem1.style.fontSize = 12 + "px";
		}else{
			var currFont = elem.style.fontSize.replace("px", "");
			if (currFont == "" ) currFont = 12;
			elem.style.fontSize = parseInt(currFont) + parseInt(fontDiff) + "px";
			elem1.style.fontSize = parseInt(currFont) + parseInt(fontDiff) + "px";
		}
	}
	
	$scope.processOption = function () {
		$scope.intial = true;
		if (selItem == 'FI'){
			$scope.modules = ["FINCORE","Finlistval"];
			$scope.Question = $scope.questions[1];
			$scope.hist.push(selItem);
			$scope.content = "Content";
		}else if(selItem == 0 || selItem == undefined || selItem == "Home"){
			$scope.modules = ["FI","Connect24"];
			$scope.hist = ["Home"];
			$scope.Question = $scope.questions[0];
			$scope.content = "Home Content";
			$scope.hideProceed = false;
		}else if(selItem == 'Connect24'){
			$scope.modules = ["CBC","UNISER","CSIS","Common Errors"];
			$scope.Question = $scope.questions[2];
			$scope.hist.push(selItem);
			$scope.content = "Connect24 - Real-time 24x7 interface for Delivery Channels,Supports the ISO 8583 message standard.It mainly consists of 1.Central bancs connect(CBC) 2.Uniserver(UNISER) 3.Stand-in server(CSIS)";
		}else if(selItem == 'Common Errors'){
			$scope.modules = ["ATM-Timeout","common error1","common error2"];
			$scope.Question = $scope.questions[8];
			$scope.hist.push(selItem);
			$scope.content = "Below are some frequently faced common errors in Connect24";
		}else if(selItem == 'ATM-Timeout'){
			$scope.modules = ["ATM-Timeout(online Mode)","ATM-Timeout(offline Mode)"];
			$scope.Question = $scope.questions[9];
			$scope.hist.push(selItem);
			$scope.content = "ATM-Timeout Content";
		}else if(selItem == 'ATM-Timeout(online Mode)'){
			$scope.modules = ["1","2"];
			$scope.content = "ATM-Timeout online content";
			$scope.Question = $scope.questions[10];
			$scope.hist.push(selItem);
		}else if(selItem == 'ATM-Timeout(offline Mode)'){
			$scope.modules = ["3","4"];
			$scope.content = "ATM-Timeout offline content";
			$scope.hist.push(selItem);
			$scope.Question = $scope.questions[11];
		}else if(selItem == 'CBC'){
			$scope.modules = ["5","6"];
			$scope.content = "CBC content";
			$scope.Question = $scope.questions[5];
			$scope.hist.push(selItem);
		}else if(selItem == 'UNISER'){
			$scope.modules = ["7","8"];
			$scope.content = "UNISER content";
			$scope.Question = $scope.questions[6];
			$scope.hist.push(selItem);
		}else if(selItem == 'CSIS'){
			$scope.modules = ["10","9"];
			$scope.content = "CSIS content";
			$scope.Question = $scope.questions[7];
			$scope.hist.push(selItem);
		}
	}
		
	

	$scope.nextquestion = function (value) {
		if (selItem == 0 || selItem == undefined ){
			$scope.Question = $scope.questions[0];
			alert($scope.questions[0])
		}else if(value == 'FI'){
			alert($scope.questions[1]);
			$scope.Question = $scope.questions[1];
		}else if(selItem == 'Connect24'){
			alert($scope.questions[2]);
			$scope.Question = $scope.questions[2];
		}else if(selItem == 'FINCORE'){
			alert($scope.questions[3]);
			$scope.Question = $scope.questions[3];
		}else if(selItem == 'Finlistval'){
			alert($scope.questions[4]);
			$scope.Question = $scope.questions[4];
		}else if(selItem == 'CBC'){
			alert($scope.questions[5]);
			$scope.Question = $scope.questions[5];
		}else if(selItem == 'UNISER'){
			alert($scope.questions[6]);
			$scope.Question = $scope.questions[6];
		}else if(selItem == 'CSIS'){
			alert($scope.questions[7]);
			$scope.Question = $scope.questions[7];
		}else if(selItem == 'ATM-Timeout(online Mode)'){
			alert($scope.questions[8]);
			$scope.Question = $scope.questions[8];
		}else if(selItem == 'ATM-Timeout(offline Mode)'){
			alert($scope.questions[9]);
			$scope.Question = $scope.questions[9];
		}else if(selItem == 'SIGALARM'){
			alert($scope.questions[10]);
			$scope.Question = $scope.questions[10];
		}
	}

	
	$scope.selectOption = function (value) {
		selItem = value;
		$scope.disableProceed = false;
	}
	
	$scope.reset = function () {
		selItem = "Home";
		$scope.processOption();
		
		$scope.disableProceed = true;
		$scope.hideProceed = false;
	}
	
	$scope.jumpto = function (item) {
		selItem = item;
		$scope.hist1 = $scope.hist.slice(0,$scope.hist.indexOf(item));
		$scope.hist = $scope.hist1;
		$scope.processOption();
		if(selItem == "Home"){
			$scope.obj = "FI and Connect24";
		}else{
			$scope.obj = selItem;
		}
		
	}
	
	$scope.load = function() {
		if(selItem == "Home"){
			$scope.hideProceed = false;
			$scope.obj = "FI and Connect24"
		}else{
			$scope.hideProceed = true;
			$scope.obj = selItem;
		}
	
	}
	
	$scope.clicked = function () {
		if(selItem == 'FI'){
			window.location = "/Users/shabarish.kesa/Desktop/work/Tool/FIcontent.html";
		}else if(selItem == 'Connect24'){
			window.location = "/Users/shabarish.kesa/Desktop/work/Tool/C24content.html";
		}else{
			window.location = "/Users/shabarish.kesa/Desktop/work/Tool/new.html";
		}
		
	}
	
}
