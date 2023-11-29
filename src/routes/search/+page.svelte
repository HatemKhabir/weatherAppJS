<script>
    /** @type {import('./$types').PageData} */
    export let data;
    $: error = data.error;
	$: weatherData = data.weatherData;
	$: iconURL = weatherData
		? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`
		: "";
	let searchResults=[];
	let showResults = false;
	
function toggleResults() {
	showResults = !showResults;
}
    let cityData = { 
		iconurl:'',
        name: '',
        country: '',
        description: '',
        temp: '',
        clouds: '',
        humidity: '',
        pressure: '',
        wind: ''
    };
    $: if (weatherData) {
        cityData = {
			iconurl:`https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`,
            name: weatherData.name,
            country: weatherData.sys?.country, // Example, adjust based on actual structure
            description: weatherData.weather[0]?.description,
            temp: weatherData.main?.temp,
            clouds: weatherData.clouds?.all,
            humidity: weatherData.main?.humidity,
            pressure: weatherData.main?.pressure,
            wind: weatherData.wind?.speed
        };
    }
	$:{
        if (weatherData && (!searchResults.length || cityData.name !== searchResults[searchResults.length - 1].name)) {
            searchResults = [...searchResults, {...cityData}]; // Push a copy of cityData to avoid reference issues
        }
	}
</script>
{#if !weatherData}
	<p class="error">{error}</p>
{:else}
<section>
	<h2>{weatherData?.name}</h2>
	<h3>{weatherData?.sys.country}</h3>
	<p class="description">
			{weatherData?.weather[0]?.description}
		</p>
		<div class="summary">
			<div class="container">
				{#if weatherData.weather[0]?.icon === '01n'}
				<div class="sunny"></div> 
				{:else if weatherData.weather[0]?.icon === '03n'}
				<div class="cloudy"></div>
				{:else if weatherData.weather[0]?.icon === '02n'}
				<div class="cloudy"></div>
				{:else if weatherData.weather[0]?.icon==='13n'}
				<div class="snowy"></div>
				{:else if weatherData.weather[0]?.icon === '04n'}
				<div class="cloudy"></div>
				{:else if weatherData.weather[0]?.icon === '50n'}
				<div class="haze"></div>
					{:else if weatherData.weather[0]?.icon === '11n'}
					<div class="stormy"></div>
					{:else if weatherData.weather[0]?.icon === '10n'}
					<div class="rainy"></div>
					{:else if weatherData.weather[0]?.icon === '09n'}
					<div class="rainy"></div>
					{:else}
					<div class="text">Weather data not available</div>
					{/if}
				</div>
				
				<span title="temperature" class="temp"
				>{weatherData.main.temp} °C</span
				>
			</div>
			<ul>
				<li title="cloudiness">
					<i class="fa-solid fa-cloud" />
					{weatherData.clouds.all} %
				</li>
				<li title="humidity">
					<i class="fa-solid fa-droplet" />
				{weatherData.main.humidity} %
			</li>
			<li title="atmospheric pressure">
				<i
				class="fa-solid fa-down-left-and-up-right-to-center"
				/>
				{weatherData.main.pressure} hPa
			</li>
			<li title="wind">
				<i>
					<span
					id="windIcon"
					style="--deg: {weatherData.wind.deg}"
					class="fa-solid fa-wind"
					/>
				</i>
				{weatherData.wind.speed} m/s
			</li>
		</ul>
	</section>
	<button class="btn btn-primary" on:click={toggleResults}>
		{showResults ? 'Hide Results' : 'Show Results'}
	</button>
	{#if showResults}
	<div class="carousel w-full">
	<div class="results flex m-6 items-center">
		{#each searchResults as result,index}
		<div id="slide{index}" class="carousel-item relative card w-96 bg-base-100 shadow-xl">
			<figure><img src={result.iconurl} alt="Shoes" /></figure>
			<div class="card-body">
				<h2 class="card-title">{result.name}, {result.country}</h2>
				<p class="capitalize">Description: {result.description}</p>
				<p>Temperature: {result.temp} °C</p>
				<p>Clouds: {result.clouds}%</p>
				<p>Humidity: {result.humidity}%</p>
				<p>Pressure: {result.pressure} hPa</p>
				<p>Wind: {result.wind} m/s</p>
			</div>
		</div>
		{/each}
	</div>
    </div>
	{/if}
	{/if}	
	<style>
		.error {
			text-align: center;
			color: yellow;
	}
	section {
		font-size: 20px;
		max-width: 340px;
		margin: 0 auto;
		padding: 5px;
	}
	h2 {
		font-weight: 500;
		font-size: 36px;
		color: yellow;
	}
	h3 {
		color: yellow;
		font-weight: unset;
		opacity: 0.7;
		font-size: 14px;
		margin-bottom: 10px;
		margin-top: -4px;
		text-transform: uppercase;
	}
	
    .description{
		text-transform:capitalize;
	}
	.summary {
		display: flex;
		align-items: center;
	}
	.temp {
		font-size: 32px;
		color: orange;
	}
	ul {
		list-style-type: none;
	}
	li {
		margin: 10px 0px;
	}
	li > i {
		display: inline-block;
		width: 30px;
		color: skyblue;
	}
	#windIcon {
		transform: rotate(calc(var(--deg) * 1deg + 90deg));
	}
	/* SUNNY */
.sunny { 
	animation: sunny 15s linear infinite;
	background: linear-gradient(to bottom, rgba(175, 195, 22, 0.962) 100%, rgba(175, 195, 22, 0.962) 100%, rgba(175, 195, 22, 0.962) 100%); 
	height: 140px;
	width: 20px; 
	margin-left: 150px;
	position: absolute;
	top: 20px;
}
.sunny:before {
	background: linear-gradient(to left, rgba(175, 195, 22, 0.962) 100%, rgba(175, 195, 22, 0.962) 100%, rgba(175, 195, 22, 0.962) 100%);
	content: ''; 
	height: 140px; 
	width: 20px;
	opacity: 1; 
	position: absolute;
	bottom: 0px;
	left: 0px; 
	transform: rotate(90deg);
}
.sunny:after {
	background: #e2d10d; 
	border-radius: 50%; 
	box-shadow: rgba(201, 195, 32, 0.468)0 0 0 10px;
	content: '';  
	height: 80px;
	width: 80px;  
	position: absolute; 
	left: -30px; 
	top: 30px;
}
@keyframes sunny { 
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

/* CLOUDY */
.cloudy {
	animation: cloudy 5s ease-in-out infinite;
	background: #FFFFFF;
	border-radius: 50%;
	box-shadow: 
		#FFFFFF 65px -15px 0 -5px, 
		#FFFFFF 25px -25px, 
		#FFFFFF 30px 10px, 
		#FFFFFF 60px 15px 0 -10px, 
		#FFFFFF 85px 5px 0 -5px;
	height: 50px;
	width: 50px; 
	margin-left: 150px;
	position: absolute;
	top: 70px; 
}
.cloudy:after {
	animation: cloudy_shadow 5s ease-in-out infinite;
	background: #000000;
	border-radius: 50%;
	content: '';
	height: 15px;
	width: 120px;
	opacity: 0.2;
	position: absolute;
	left: 5px; 
	bottom: -60px;
  transform: scale(1);
}
@keyframes cloudy {
	50% { transform: translateY(-20px); }
}
@keyframes cloudy_shadow {
	50% { transform: translateY(20px) scale(.7); opacity:.05; }
}

/* RAINY */
.rainy {
	animation: rainy 5s ease-in-out infinite 1s;
	background: #CCCCCC; 
	border-radius: 50%;
	box-shadow: 
		#CCCCCC 65px -15px 0 -5px, 
		#CCCCCC 25px -25px, 
		#CCCCCC 30px 10px, 
		#CCCCCC 60px 15px 0 -10px, 
		#CCCCCC 85px 5px 0 -5px;
	display: block;
	height: 50px;
	width: 50px;
	margin-left: 150px;
	position: absolute;
	top: 70px;
}
.rainy:after {
	animation: rainy_shadow 5s ease-in-out infinite 1s;
	background: #000000;
	border-radius: 50%;
	content: '';
	height: 15px;
	width: 120px;
	opacity: 0.2;
	position: absolute;
	left: 5px; 
	bottom: -60px;
	transform: scale(1);
}
.rainy:before {
	animation: rainy_rain .7s infinite linear;
	content: '';
	background: #CCCCCC;
	border-radius: 50%;
	display: block;
	height: 6px;
	width: 3px;
	opacity: 0.3;
	transform: scale(.9);
}
@keyframes rainy {
	50% { transform: translateY(-20px); }
}
@keyframes rainy_shadow {
	50% { transform: translateY(20px) scale(.7); opacity: 0.05; }
}
@keyframes rainy_rain {
	0% {  
		box-shadow: 
			rgba(0,0,0,0) 30px 30px, 
			rgba(0,0,0,0) 40px 40px,  
			#000 50px 75px, 
			#000 55px 50px, 
			#000 70px 100px, 
			#000 80px 95px, 
			#000 110px 45px, 
			#000 90px 35px; 
	}
	25% {  
	  	box-shadow: 
			#000 30px 45px,
			#000 40px 60px,
			#000 50px 90px,
			#000 55px 65px,
			rgba(0,0,0,0) 70px 120px,
			rgba(0,0,0,0) 80px 120px,
			#000 110px 70px,
			#000 90px 60px;
	}
	26% {  
		box-shadow:
			#000 30px 45px,
			#000 40px 60px,
			#000 50px 90px,
			#000 55px 65px,
			rgba(0,0,0,0) 70px 40px,
			rgba(0,0,0,0) 80px 20px,
			#000 110px 70px,
			#000 90px 60px; 
	}
	50% { 
		box-shadow:
			#000 30px 70px,
			#000 40px 80px,
			rgba(0,0,0,0) 50px 100px,
			#000 55px 80px,
			#000 70px 60px,
			#000 80px 45px,
			#000 110px 95px,
			#000 90px 85px;
	}
	51% {
		box-shadow:
			#000 30px 70px,
			#000 40px 80px,
			rgba(0,0,0,0) 50px 45px,
			#000 55px 80px,
			#000 70px 60px,
			#000 80px 45px,
			#000 110px 95px,
			#000 90px 85px;
	}
	75% {
		box-shadow:
			#000 30px 95px,
			#000 40px 100px,
			#000 50px 60px,
			rgba(0,0,0,0) 55px 95px,
			#000 70px 80px,
			#000 80px 70px,
			rgba(0,0,0,0) 110px 120px,
			rgba(0,0,0,0) 90px 110px;
	}
	76% {
		box-shadow:
			#000 30px 95px,
			#000 40px 100px,
			#000 50px 60px,
			rgba(0,0,0,0) 55px 35px,
			#000 70px 80px,
			#000 80px 70px,
			rgba(0,0,0,0) 110px 25px,
			rgba(0,0,0,0) 90px 15px;
	}
	100% {
		box-shadow:
			rgba(0,0,0,0) 30px 120px,
			rgba(0,0,0,0) 40px 120px,
			#000 50px 75px,
			#000 55px 50px,
			#000 70px 100px,
			#000 80px 95px,
			#000 110px 45px,
			#000 90px 35px;
	}
}

/* STORMY */
.stormy {
	animation: stormy 5s ease-in-out infinite;
	background: #222222;
	border-radius: 50%;
	box-shadow: 
		#222222 65px -15px 0 -5px, 
		#222222 25px -25px, 
		#222222 30px 10px, 
		#222222 60px 15px 0 -10px, 
		#222222 85px 5px 0 -5px;
	height: 50px;  
	width: 50px; 
	margin-left: -70px; 
	position: absolute;
	left: 947px; 
	top: 70px; 
}
.stormy:after {
	animation: stormy_shadow 5s ease-in-out infinite;
	background: #000;
	border-radius: 50%;
	content: '';
	height: 15px; 
	width: 120px; 
	opacity: 0.2;
	position: absolute;
	left: 5px; 
	bottom: -60px;
	transform: scale(1);
}
.stormy:before {
	animation: stormy_thunder 2s steps(1, end) infinite; 
	border-left: 0px solid transparent;
	border-right: 7px solid transparent;
	border-top: 43px solid yellow; 
	box-shadow: yellow -7px -32px;
	content: '';
	display: block;
	height: 0;
	width: 0;
	position: absolute;
	left: 57px;
	top: 70px;
	transform: rotate(14deg);
	transform-origin: 50% -60px;
}
@keyframes stormy {
	50% { transform: translateY(-20px); } 
}  
@keyframes stormy_shadow {
	50% { transform: translateY(20px) scale(.7); opacity: 0.05; }
}
@keyframes stormy_thunder {
	0%  { transform: rotate(20deg); opacity:1; }
	5%  { transform: rotate(-34deg); opacity:1; }
	10% { transform: rotate(0deg); opacity:1; }
	15% { transform: rotate(-34deg); opacity:0; }
}

/* SNOWY */
.snowy {
	animation: snowy 5s ease-in-out infinite 1s;
	background: #FFFFFF; 
	border-radius: 50%;
	box-shadow: 
		#FFFFFF 65px -15px 0 -5px, 
		#FFFFFF 25px -25px, 
		#FFFFFF 30px 10px, 
		#FFFFFF 60px 15px 0 -10px, 
		#FFFFFF 85px 5px 0 -5px;
	display: block;
	height: 50px;
	width: 50px;
	margin-left: -60px;
	position: absolute;
	left: 1112px;
	top: 70px;
}
.snowy:after {
	animation: snowy_shadow 5s ease-in-out infinite 1s;
	background: #000000;
	border-radius: 50%;
	content: '';
	height: 15px;
	width: 120px;
	opacity: 0.2;
	position: absolute;
	left: 8px;
	bottom: -60px;
	transform: scale(1);
}
.snowy:before {
	animation: snowy_snow 2s infinite linear;
	content: '';
	border-radius: 50%;
	display: block;
	height: 7px;
	width: 7px;
	opacity: 0.8;
	transform: scale(.9);
}
@keyframes snowy {
	50% { transform: translateY(-20px); }
}
@keyframes snowy_shadow {
	50% { transform: translateY(20px) scale(.7); opacity: 0.05; }
}
@keyframes snowy_snow {
	0% {  
		box-shadow: 
			rgba(238,238,238,0) 30px 30px, 
			rgba(238,238,238,0) 40px 40px,  
			#EEEEEE 50px 75px, 
			#EEEEEE 55px 50px, 
			#EEEEEE 70px 100px, 
			#EEEEEE 80px 95px, 
			#EEEEEE 110px 45px, 
			#EEEEEE 90px 35px; 
	}
	25% {  
	  	box-shadow: 
			#EEEEEE 30px 45px,
			#EEEEEE 40px 60px,
			#EEEEEE 50px 90px,
			#EEEEEE 55px 65px,
			rgba(238,238,238,0) 70px 120px,
			rgba(238,238,238,0) 80px 120px,
			#EEEEEE 110px 70px,
			#EEEEEE 90px 60px;
	}
	26% {  
		box-shadow:
			#EEEEEE 30px 45px,
			#EEEEEE 40px 60px,
			#EEEEEE 50px 90px,
			#EEEEEE 55px 65px,
			rgba(238,238,238,0) 70px 40px,
			rgba(238,238,238,0) 80px 20px,
			#EEEEEE 110px 70px,
			#EEEEEE 90px 60px; 
	}
	50% { 
		box-shadow:
			#EEEEEE 30px 70px,
			#EEEEEE 40px 80px,
			rgba(238,238,238,0) 50px 100px,
			#EEEEEE 55px 80px,
			#EEEEEE 70px 60px,
			#EEEEEE 80px 45px,
			#EEEEEE 110px 95px,
			#EEEEEE 90px 85px;
	}
	51% {
		box-shadow:
			#EEEEEE 30px 70px,
			#EEEEEE 40px 80px,
			rgba(238,238,238,0) 50px 45px,
			#EEEEEE 55px 80px,
			#EEEEEE 70px 60px,
			#EEEEEE 80px 45px,
			#EEEEEE 110px 95px,
			#EEEEEE 90px 85px;
	}
	75% {
		box-shadow:
			#EEEEEE 30px 95px,
			#EEEEEE 40px 100px,
			#EEEEEE 50px 60px,
			rgba(238,238,238,0) 55px 95px,
			#EEEEEE 70px 80px,
			#EEEEEE 80px 70px,
			rgba(238,238,238,0) 110px 120px,
			rgba(238,238,238,0) 90px 110px;
	}
	76% {
		box-shadow:
			#EEEEEE 30px 95px,
			#EEEEEE 40px 100px,
			#EEEEEE 50px 60px,
			rgba(238,238,238,0) 55px 35px,
			#EEEEEE 70px 80px,
			#EEEEEE 80px 70px,
			rgba(238,238,238,0) 110px 25px,
			rgba(238,238,238,0) 90px 15px;
	}
	100% {
		box-shadow:
			rgba(238,238,238,0) 30px 120px,
			rgba(238,238,238,0) 40px 120px,
			#EEEEEE 50px 75px,
			#EEEEEE 55px 50px,
			#EEEEEE 70px 100px,
			#EEEEEE 80px 95px,
			#EEEEEE 110px 45px,
			#EEEEEE 90px 35px;
	}
}









































body {
	font-family: sans-serif;
	background: #f5f5f5;
	margin: 0;
}
h1 {
	text-align: center;
	font-weight: 400;
	position: absolute;
	width: 100%;
  font-size: 15px;
	top: 50%;
	margin-top: -130px;
  	opacity: .6;
  	letter-spacing: 2px;
}
#fabrizio {
	border-top: 100px solid black; 
	border-right: 63px solid transparent;
	width: 0;
	transform: scale(.33);
	transform-origin: 0 0;
	margin: 20px;
	opacity:.6;
    display: none;
}
#fabrizio:before {
	background: black;
	width: 20px;
	height: 30px;
	content: '';
	display: block;
	transform: skewX(-32deg);
	position: relative;
	top: -64px;
	left: 30px;
}
#fabrizio:after {
	background: black;
	width: 40px;
	height: 36px;
	content: '';
	display: block;
	transform: skewX(-32deg);
	position: relative;
	top: -130px;
	left: 50px;
}
a { 
  position: absolute;
  top: 30px;
  left: 60px;
  color: #777;
  text-decoration: none;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: none;
}

.container {
	display: flex;
	justify-content: center;
	transform: scale(.9);
	width: 1200px;
	position: absolute;
	height: 210px;
	left: 50%;
	top: 50%;
	margin: -65px -600px;
}
</style>
