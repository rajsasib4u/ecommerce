<?php 

require 'db.php'; 

if(@$_SESSION['logged'] != ''){ ?>

  <script type="text/javascript">window.location.href='dashboard.php';</script>

<?php }


?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Login</title>

    
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    
    <link href="css/style.min.css" rel="stylesheet">

    <style type="text/css">
        #responseMsg {
          display: none; 
        }
    </style>

</head>

<body class="">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                    </div>
                                    <form class="user" id="login">
                                        <input type="hidden" name="action" value="login_action">
                                        <div class="form-group">
                                            <input type="text" class="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter username" name="username">
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password" name="password">
                                        </div>
                                        

                                        <button type="submit" class="btn btn-primary btn-user btn-block"> Login</button> 
                                        
                                    </form>
                                    <hr>

                                    <h6>Username: admin, Password: admin</h6>

                                    <div align="center" class="mt-4">             

                                      <span id="responseMsg"></span>
                                  </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

    
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    
    <script src="js/javascript.min.js"></script>

    <script type="text/javascript">
      $( '#login' )
        .submit( function( e ) {

          var form_data = $('#login').serialize();
          $.ajax( {
              url:'action/action.php',
              type:'POST',
              data:form_data,
              async:false,
              cache:false,
              dataType:'JSON',
              success:function(data){
                var msg = data.message;
                
                //alert(msg);
              

                  if($.trim(data.status) == 'success'){

                    $('#responseMsg').html(msg)

                    $('#responseMsg').css('display', 'block');
                    $('#responseMsg').css('color', 'green');
                      
                    setTimeout(function(){
                     
                      $('#responseMsg').css('display', 'none');
                    },2000);

                    setTimeout(function(){
                      window.location.href='dashboard.php';
                     
                    },3000);
                      
                     
    
                    //alert(msg);
                   /* setTimeout(function(){
                      window.location.href='dashboard/dashboard';
                    },1000);*/
                  }

                  if($.trim(data.status) == 'error'){

                    $('#responseMsg').html(msg)

                    $('#responseMsg').css('display', 'block');
                    $('#responseMsg').css('color', 'red'); 

                    setTimeout(function(){                     
                      $('#responseMsg').css('display', 'none');
                    },2000); 
                    
                  }
              }
            } );
          e.preventDefault();
        } );
</script>

</body>

</html>