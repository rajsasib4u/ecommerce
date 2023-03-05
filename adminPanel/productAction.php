<?php 


require('db.php');

$id = $_REQUEST['id'];
    

?>


<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Add Product</title>

    <!-- Custom fonts for this template -->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/style.min.css" rel="stylesheet">

    <!-- Custom styles for this page -->
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">

    <style type="text/css">
        #responseMsg {
          display: none; 
        }
    </style>

</head>

<body id="page-top">

    
    <div id="wrapper">

        
         <?php require('includes/sidebar.php') ?>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                 <?php require('includes/topbar.php'); ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <h1 class="h3 mb-2 text-gray-800">Add New Product</h1>
                   
                    <div class="card shadow mb-4">

                        <div class="card-header py-3">
                           
                        </div>
                        
                        <div class="card-body">
                            <div class="col-lg-6">

                                <?php 

                                if(isset($id)) {


                                    $sql = "SELECT * from products where prodID=:id";
                                    $result = $DB->prepare($sql);

                                    $result->bindValue(':id', $id);
                                    $result->execute();

                                    while ($row = $result->fetch()) {

                                        $prodName = $row['prodName'];
                                        $prodPrice = $row['prodPrice'];
                                        $prodDesc = $row['prodDesc'];
                                        $prodQuantity = $row['prodQuantity'];
                                        
                                    }
                                }


                                ?>
                                <form id="addProduct">
                                    <input type="hidden" name="action" value="<?php  echo (isset($id))?'update_Product':'add_Product' ?>">

                                    <input type="hidden" name="editID" value="<?php  echo $id; ?>">
                                  <div class="form-group row">
                                    <label for="staticEmail" class="col-sm-3 col-form-label">Name</label>
                                    <div class="col-sm-9">
                                     <input type="text" class="form-control" id="prodName" name="prodName" placeholder="" value="<?php echo $prodName; ?>">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Price</label>
                                    <div class="col-sm-9">
                                      <input type="text" class="form-control" id="prodPrice" name="prodPrice" placeholder="" value="<?php echo $prodPrice; ?>">
                                    </div>
                                  </div>

                                  <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-3 col-form-label"> Description</label>
                                    <div class="col-sm-9">
                                      <input type="text" class="form-control" id="prodDesc" name="prodDesc" placeholder="" value="<?php echo $prodDesc; ?>">
                                    </div>
                                  </div>
                                  <div class="form-group row">
                                    <label for="inputPassword" class="col-sm-3 col-form-label"> Quantity</label>
                                    <div class="col-sm-9">
                                      <input type="text" class="form-control" id="prodQuantity" name="prodQuantity" placeholder="" value="<?php echo $prodQuantity; ?>">
                                    </div>
                                  </div>

                                  <div align="center">                                   

                                      <button type="submit" class="btn btn-primary btn-sm"> <?php  echo (isset($id))?'Update':'Add' ?></button> &nbsp; <a href="products.php" class="btn btn-warning btn-sm">Back</a>

                                  
                                  </div>

                                  <div align="center" class="mt-4">             

                                      <span id="responseMsg"></span>
                                  </div>

                                  
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <?php require('includes/footer.php') ?>
           

        </div>
       

    </div>
    

    
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a class="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

    
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/javascript.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>

    <script type="text/javascript">


      $( '#addProduct' )
        .submit( function( e ) {

          var form_data = $('#addProduct').serialize();
          $.ajax( {
              url:'action/action.php',
              type:'POST',
              data:form_data,
              async:false,
              cache:false,
              dataType:'JSON',
              success:function(data){
                var msg = data.message;
                
             

                  if($.trim(data.status) == 'success'){


                    $('#responseMsg').html(msg)

                    $('#responseMsg').css('display', 'block');
                    $('#responseMsg').css('color', 'green');
                      
                    setTimeout(function(){
                     
                      $('#responseMsg').css('display', 'none');
                    },2000);

                    setTimeout(function(){
                      window.location.href='products.php';
                     
                    },3000);
                  }

                  if($.trim(data.status) == 'exist'){

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