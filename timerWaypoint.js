(function(){
	
	TimerWaypoint = {

		idle: 0,

		currentPoint: "",

		arrTimes: {},

		t: 0,

		start: function() {
			
			var nameCurrentPoint = TimerWaypoint.currentPoint;

			if( TimerWaypoint.arrTimes[nameCurrentPoint] === undefined ) {
				TimerWaypoint.arrTimes[nameCurrentPoint] = [];	
			} else {

				var existTimerInWaypoint = TimerWaypoint.arrTimes[nameCurrentPoint];
				var lastEntry 			 = existTimerInWaypoint[existTimerInWaypoint.length -1];
				
				if( lastEntry !== undefined && lastEntry.stop === undefined ) {
					return;
				}
			}

			var newTimer = {
					"start" : new Date(),
					"stop"	: undefined,
					"idle"  : 0,
					"name"  : nameCurrentPoint
				}


			TimerWaypoint.arrTimes[nameCurrentPoint].push(
															newTimer	
									    				)
		},

		stop: function() {
			var nameCurrentPoint = TimerWaypoint.currentPoint;			
			TimerWaypoint.arrTimes[nameCurrentPoint][0].stop = new Date()
		},

		setIdleToThisPoint: function(duration,name) {
			var idlePoint = parseFloat(duration);
			if( isNaN(idlePoint) === false ) {
				TimerWaypoint.inactivityTime(idlePoint);	
				TimerWaypoint.arrTimes[TimerWaypoint.currentPoint][0].idle = idlePoint;
			}		
		},

		setCurrentPoint : function(namePoint) {
			TimerWaypoint.currentPoint = namePoint;
		},

		getCurrentTime: function() {
			return TimerWaypoint.getTime();
		},

		getTime: function() {

			var totalTime = 0;

			var start = TimerWaypoint.arrTimes[TimerWaypoint.currentPoint][0].start
			var stop  = TimerWaypoint.arrTimes[TimerWaypoint.currentPoint][0].stop

			if( stop === undefined ) {
				stop = new Date();
			}

			var spent = stop - start;
			return (Number(spent));
		},

		initialize: function (){
			TimerWaypoint.start();
		},

		inactivityTime : function(idle) {
		    
		    window.onload = resetTimer;
		    document.onmousemove = resetTimer;
		    document.onkeypress = resetTimer;

		    function notify() {
		        toastr.info("Eiiii que te has dormido, recuerda que estas en el punto: " + TimerWaypoint.arrTimes[TimerWaypoint.currentPoint][0].name + "llevas " + TimerWaypoint.getTime() / 1000 );	        
		    }

		    function resetTimer() {
		        clearTimeout(TimerWaypoint.t);
		        TimerWaypoint.t = setTimeout(notify, idle);		        
		    }			

		},


	}

})();