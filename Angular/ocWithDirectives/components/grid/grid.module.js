	angular
		.module(
			'gridModule', 
			[
				'ngGrid'
			]
		)
		.directive(
			'persons',
			[	
				'$scope',
				function( $scope ) {
					return {
						restrict	: 'AE',
						replace		: true,
						templateUrl	: 'components/grid/partials/grid.html',
						//template	: '<div><span>{{test}}</span><br/><div ng-grid="gridOptions" class="gridStyle"></div></div>',
						compile		: function() {
							console.info("From <persons> directive compile()...");
							return {
								pre	: function preLink() { 
									console.info("Prelink");						
								},
								post: function postLink( $scope, iElement, iAttrs, controller ) {
									console.info("Postlink");
								}
							};
						},
						controller	: function( $scope ){
							console.info( "From <persons> directive controller()..." );
							$scope.test 	= "Hey again";
							
							$scope.myData 	= [
								{
									name: "Moroni", 
									age	: 50
								},
								{
									name: "Tiancum", 
									age	: 43
								},
								{
									name: "Jacob", 
									age	: 27
								},
								{
									name: "Nephi", 
									age	: 29
								},
								{
									name: "Enos", 
									age	: 34
								}
							];
							
							$scope.gridOptions 	= { 
								data: 'myData' 
							};
						}
					};
				}
			]
		);
