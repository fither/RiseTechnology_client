<template>
  <div id="footer">
    <span class="d-flex align-items-center">
      <i class="fab fa-git"></i>
      <a href="#">Repository</a>
    </span>
    <span class="copyright">
      &copy;
      2021 Dilsaz Oktayı
    </span>
  </div>
</template>

<style>
  #footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5;
    padding: 0.5rem 0.5rem;
    margin-left: -12px;
    margin-right: -12px;
    margin-top: 2rem;
  }

  #footer i {
    font-size: 1.5rem;
    background-color: #ffe6e2;
    color: #fc7159;
    border-radius: 5px;
    padding: 0.1rem 0.4rem;
  }

  #footer a {
    margin-left: 1rem;
    color: #857c7c;
  }

  #footer .copyright {
    color: #ac9796;
  }
</style>