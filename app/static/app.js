var start = 0;
var min = 0;
var sek = 0;
var endmin = 0;
var play_grey = $("#pg").attr("src");
var play1 = $("#pl").attr("src");
var songs = [["http://failiem.lv/down.php?i=bawsvve&n=Varese_Ameriques.mp3", "Varese Ameriques"],
			 ["http://failiem.lv/down.php?i=ebuokiy&n=KrzysztofPenderecki-ThrenodyfortheVictimsofHiroshima.mp3", "Krzysztof Penderecki - Threnody for the Victims of Hiroshima"]];
var myAudio = document.getElementById('player');
function newsong() {
	$(".statuss").text("ielādē...");
	song_no = Math.floor((Math.random() * songs.length));
	$("#atbilde").text(song_no);
	myAudio.src = songs[song_no][0];
};

newsong();

myAudio.addEventListener('loadedmetadata', function() {
						 len = myAudio.duration;
						 start = Math.floor((Math.random() * (len - 60)) + 1);
						 min = Math.floor(start/60);
						 endmin = min + 1;
						 sek = two_digits(start % 60);
						 this.currentTime = start;
						 this.play();
						 $(".statuss").text("spēlē");
						 });

myAudio.addEventListener("timeupdate", function() {
						 if(this.currentTime >= start + 60) {
						 this.pause();
						 $("#play").prop('disabled', true);
						 $("#play").attr("src",play_grey);
						 $(".statuss").text("nospēlēts");
						 };
						 });

$("#play").click(function() {
				 if (myAudio.paused) {
				 myAudio.play();
				 $(".statuss").text("spēlē");
				 } else {
				 myAudio.pause();
				 $(".statuss").text("pārtraukts");
				 };
				 
				 });

$("#next").click(function() {
				 newsong();
				 $("#play").prop('disabled', false);
				 $("#play").attr("src",play1);
				 $("#atbilde").addClass("hidden");
				 });

$("#again").click(function() {
				  myAudio.currentTime = start;
				  myAudio.play();
				  $(".statuss").text("spēlē");
				  $("#play").prop('disabled', false);
				  $("#play").attr("src",play1);
				  });

$("#answer").click(function() {
				   $("#atbilde").text(songs[song_no][1]+" ("+min+":"+sek+" - "+endmin+":"+sek+")");
				   $("#atbilde").toggleClass("hidden");
				   });
				   
$("input").click(function() {
	btn = $(this);
	btn.toggleClass("sel");
	setTimeout(function(){
			   btn.toggleClass("sel");
			   }, 50);
});

function two_digits(n) {
	if (n < 10) {
		p = "0" + n;
	} else {
		p = n;
	};
	return p
}
