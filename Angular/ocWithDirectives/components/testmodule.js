var test	= angular
	.module(
		'test', 
		[
			'oc.lazyLoad'
		]
	)
	.config(
		[
			'$ocLazyLoadProvider',		
			function( $ocLazyLoadProvider ){
				$ocLazyLoadProvider.config(
					{
						asyncLoader: requirejs
					}
				);
			}
		]
	)
	.controller(
		'mainController', 
		[
			'$scope',
			'$ocLazyLoad', 
			function( $scope, $ocLazyLoad ){
				$scope.test 		= "Hi there";
				$scope.persons 		= {
					visible	:	false
				};
				var _persons	= $scope.persons;

				$scope.load 		= function() {
					console.info( 'From $scope.load()...' );
					$ocLazyLoad.load(
						{
							name	: 'gridModule',
							files	: [
								'gridModule'
							]
						}
					)
					.then(
						function(){
							$scope.persons.visible	= true;
						}
					);
				}

			}
		]
	);