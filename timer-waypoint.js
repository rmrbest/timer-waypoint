(function(){
	
	TimerWaypoint = {

		idle: 0,

		currentPoint: "",

		arrTimes: [],

		t: 0,

		msg: "",

		position: 0,

		start: function() {
			
			var nameCurrentPoint = TimerWaypoint.currentPoint;
			var position = TimerWaypoint.position;

			if( TimerWaypoint.arrTimes[nameCurrentPoint] === undefined ) {
				//TimerWaypoint.arrTimes[TimerWaypoint.position]["waypoint"] = [];	
			} else {
				var existTimerInWaypoint = TimerWaypoint.arrTimes[TimerWaypoint.position];
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
				};


			TimerWaypoint.arrTimes.push({ waypoint : newTimer});
									    				
		},

		stop: function() {
			var nameCurrentPoint = TimerWaypoint.currentPoint;			
			TimerWaypoint.arrTimes[nameCurrentPoint].waypoint.stop = new Date();
		},

		stopByKey: function(key) {
			try{
				TimerWaypoint.arrTimes[key].waypoint.stop = new Date();	
			}catch(err){
				console.log("Error stopByKey " + err);
			}			
		},

		setIdleToThisPoint: function(duration, callback) {
			var idlePoint = parseFloat(duration);
			if( isNaN(idlePoint) === false ) {
				TimerWaypoint.inactivityTime(idlePoint, callback);	
				TimerWaypoint.arrTimes[TimerWaypoint.position].waypoint.idle = idlePoint;
			}		
		},

		setCurrentPoint : function(position) {
			TimerWaypoint.position = position;
		},

		setName : function(name) {
			TimerWaypoint.currentPoint = name;
		},
		
		setMessage : function(msg) {
			TimerWaypoint.msg = msg;
		},

		getCurrentTime: function() {
			return TimerWaypoint.getTime();
		},

		getTimeByKey: function(key) {
			var totalTime = 0;

			try{
				
				var start = TimerWaypoint.arrTimes[key].waypoint.start;
				var stop  = TimerWaypoint.arrTimes[key].waypoint.stop;

				if( stop === undefined ) {
					stop = new Date();
				}

				var spent = stop - start;
				return (Number(spent));

			}catch(err) {
				console.log("Error array TimerWaypoint " + err);
				return 0;
			}

			return 0;

		},

		getTime: function() {

			var totalTime = 0;

			var start = TimerWaypoint.arrTimes[TimerWaypoint.position].waypoint.start;
			var stop  = TimerWaypoint.arrTimes[TimerWaypoint.position].waypoint.stop;

			if( stop === undefined ) {
				stop = new Date();
			}

			var spent = stop - start;
			return (Number(spent));
		},

		getAllTime: function() {
			
			var totalTime = 0;

			for (var i = 0; i < TimerWaypoint.arrTimes.length; i++) {
				var start = TimerWaypoint.arrTimes[i].waypoint.start;
				var stop  = TimerWaypoint.arrTimes[i].waypoint.stop;
				
				if( stop === undefined ) {
					stop = new Date();
				}

				var spent = stop - start;
				totalTime += (Number(spent));
			}

			return totalTime;

		},

		initialize: function (){
			TimerWaypoint.start();
		},

		inactivityTime : function(idle, callback) {
		    
		    window.onload = resetTimer;
		    document.onmousemove = resetTimer;
		    document.onkeypress = resetTimer;

		    function notify() {
				if( typeof callback === 'function'){
					callback(param);
				} 			        
		    }

		    function resetTimer() {
		        clearTimeout(TimerWaypoint.t);
		        TimerWaypoint.t = setTimeout(notify, TimerWaypoint.arrTimes[TimerWaypoint.position].waypoint.idle);		        
		    }			

		},


	};

})();