<?php 

require 'db.php'; 

if(@$_SESSION['logged'] == ''){ ?>

  <script type="text/javascript">location.href='index.php';</script>

<?php }


?>