var positions = [];
      var score = 0
      var index = 0;
      var result ;
      var set = "" ;
      var time = null;
      var sum_time = 0;
      var counter;

      $(document).ready(function(){
         $("#board").hide();
         $("#p1").hide();
         $("#p2").hide();
         $("#p3").hide();
         $("#p4").hide();
         $("#p5").hide();
         $("#p6").hide();
         $("#p7").hide();
         $("#p8").hide();
         $("#c1").hide();
         $("#c2").hide();
         $("#c3").hide();
         $("#c4").hide();
         $("#text-num").hide();
         $("#text-time").hide();
         $("#again").hide();
      });

      function count_time(){
      
        counter = 9;
        time = setInterval(function() {
      
        if (counter < 0) {
        sum_time += 10;
        console.log("time"+sum_time);
        console.log("count in click"+counter);
        clearInterval(time);
        check_result("99");
      }
      else{
        document.getElementById("text-time").textContent = "เวลา: "+ counter--;
      }

}, 1000);
      }

      function play_again(){
        clearInterval(time);
        hideall();
        $("#again").hide();
        positions = [];
        score = 0;
        index = 0;
        sum_time = 0;
        $("#logo").show();
        $("#button10").show();
        $("#button20").show();
      }


      function hideandshow(){
        
        
        hideall();
        
       
        if(id === "28"){
       
          $("#p1").show();
        }
        else if (id === "16"){
          $("#p2").show();
        }
        else if (id === "24"){
          $("#p3").show();
        }
        else if (id === "27"){
          $("#p4").show();
        }
        else if (id === "25"){
          $("#p5").show();
        }
        else if (id === "15"){
          $("#p6").show();
        }
        else if (id === "17"){
          $("#p7").show();
        }
        else if (id === "19"){
          $("#p8").show();
        }
        else {
          
          $("#board").show();
          $("#question").show();

        }
      $("#text-num").html("ข้อที่ "+ (index + 1) + "/" + set);
      $("#text-num").show();
     

      }

      function hideall(){
        $("#board").hide();
        $("#question").hide();
        $("#p1").hide();
        $("#p2").hide();
        $("#p3").hide();
        $("#p4").hide();
        $("#p5").hide();
        $("#p6").hide();
        $("#p7").hide();
        $("#p8").hide();
      }

      function check_result(x){
        if (x != "99"){
          sum_time += (10 - counter);
        }
        
        console.log("count in click"+counter);
        console.log("time in click"+sum_time);
        clearInterval(time);
        document.getElementById("text-time").textContent = "เวลา: "+ 10;
        count_time();
        if( x === parseInt(result)){
          score = score + 1;
        }
        if( ((index === 10) && (set === "10")) || 
          ((index === 20) && (set === "20"))){
            finish();
          }

        else{
           getdata();
        }
       
      }

      function finish(){
        clearInterval(time);
        hideall();
         $("#c1").hide();
         $("#c2").hide();
         $("#c3").hide();
         $("#c4").hide();
         $("#text-num").hide();
         $("#text-time").hide();
         $("#board").show();
        $("#question").show();
        document.getElementById("question").textContent = "คุณตอบถูกทั้งหมด : "+ score +
        " ข้อ" + "  เวลาที่ใช้ : " + sum_time + " วินาที";
        $("#again").show();

      }


      function getdata(){
      $(document).ready(function(){
        $.ajax({
          url: 'data.json',
          method: 'GET',
          success: function(response){

            id = response[positions[index]].id;
            $('#question').html(response[positions[index]].question);
            hideandshow();
            $('#c1').html(response[positions[index]].choice1);
            $('#c2').html(response[positions[index]].choice2);
            $('#c3').html(response[positions[index]].choice3);
            $('#c4').html(response[positions[index]].choice4);
            result = response[positions[index]].answer;
            index = index + 1;
          }
        });
      });

    }

      

    function random(x){
      var i = 0;
      while(i < x){
        var num = Math.floor(Math.random() * 30);
        if(positions.indexOf(num) === -1){
          positions.push(num);
          i = i + 1;
         
        }
        

      }
    }

    function start_question(x){
      random(x);
      set = "" + x;
      $("#button10").hide();
      $("#button20").hide();
      $("#logo").hide();
      document.getElementById("text-time").textContent = "เวลา: "+ 10;
      $("#text-time").show();
      count_time();
      getdata();
      $('#c1').show();
      $('#c2').show();
      $('#c3').show();
      $('#c4').show();
    }