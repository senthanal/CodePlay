requirejs.config({
	baseUrl	: './',
    paths	: {
		'jquery'	: 'libs/jquery/dist/jquery.min',
        'angular'	: 'libs/angular/angular.min',
        'test'		: 'components/testmodule',
        'gridModule': 'components/grid/grid.module',
        'ngGrid'	: 'libs/ng-grid/build/ng-grid.debug',
        'ocLazyLoad': 'libs/ocLazyLoad/dist/ocLazyLoad'
    },
    shim	: {
		'angular'	: [
			'jquery'
		],
		'ocLazyLoad': [
			'angular'
		],
		'ngGrid'	: [
			'angular'
		],
		'gridModule': [
			'test', 
			'ngGrid'
		],
        'test'		: [
			'ocLazyLoad'
		]
    }
});

// Start the main app logic.
requirejs(
	[
		'test'
	], 
	function() {
		angular.bootstrap(
			document.body, 
			[
				'test'
			]
		);
	}
);