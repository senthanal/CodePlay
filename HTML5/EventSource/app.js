var wgw3	= angular
				.module( 
					'wgw3', 
					[] 
				);

wgw3
	.controller( 
		'wgwController', 
		[
			'$scope',
			'$timeout',
			'$http',
			function( $scope, $timeout, $http ){		
				$scope.consoleLog	= [];
				$scope.toggleEnable	= true;
				$scope.sse	= {
					status	: true,
					style	: 'alert-info',
					message	: {
						title	: 'Heads up!',
						content	: "This alert needs your attention, but it's not super important."
					}
				};
				
				$scope.reverse = function(array) {
					var copy = [].concat(array);
					return copy.reverse();
				}
				
				var _sse	= $scope.sse;
				// sse.php sends messages with text/event-stream mimetype.
				var source;
				
				var updateConnectionStatus	= function( status ){
					$scope.$apply(
						function(){
							_sse.status	= status;
						}
					);
				};
				
				var updateMessage	= function( newMessage ){
					$scope.$apply(
						function(){
							angular.extend(
								_sse,
								newMessage
							);
						}
					);
				};
				
				var initEventSource	= function(){
					source = new EventSource('sse.php');
					// sse.php sends messages with text/event-stream mimetype.
					source.addEventListener('message', function(event) {
						var data = JSON.parse(event.data);
						
						if( data.status === 1 ){
							updateMessage(
								{
									style	: 'alert-success',
									message	: {
										title	: 'Well done!',
										content	: "You successfully read this important alert message."
									}
								}
							);
						}					
						
						if( data.status === 2 ){
							updateMessage(
								{
									style	: 'alert-info',
									message	: {
										title	: 'Heads up!',
										content	: "This alert needs your attention, but it's not super important."
									}
								}
							);
						}					
						
						if( data.status === 3 ){
							updateMessage(
								{
									style	: 'alert-warning',
									message	: {
										title	: 'Warning!',
										content	: "Best check yo self, you're not looking too good."
									}
								}
							);
						}					
						
						if( data.status === 4 ){
							updateMessage(
								{
									style	: 'alert-danger',
									message	: {
										title	: 'Oh snap!',
										content	: "Change a few things up and try submitting again."
									}
								}
							);
						}
						
						
						var d = new Date(data.msg * 1e3);
						var timeStr = [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

						//coolclock.render(d.getHours(), d.getMinutes(), d.getSeconds());

						$scope.consoleLog.push( 
							'Random Number: ' + data.status +
							', lastEventID: ' + event.lastEventId +
							', server time: ' + timeStr
						);
							
					}, false);

					source.addEventListener('open', function(event) {
						$scope.consoleLog.push( '> Connection was opened' );
						updateConnectionStatus( true );
					}, false);

					source.addEventListener('error', function(event) {
						if (event.eventPhase == 2) { //EventSource.CLOSED
							$scope.consoleLog.push( '> Connection was closed' );
							updateConnectionStatus( false );
						}
					}, false);
					
				};
			
				$scope.$watch(
					'toggleEnable',
					function( isEnable ){
						if( angular.isUndefined( isEnable ) ) return;
						
						if( isEnable )
							initEventSource();
						else{
							source.close();
							_sse.status		= false;
							//updateConnectionStatus( false );
						}
					}
				);
			}
		]
	);