<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Photography Network</title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="language" content="en">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="stylesheet" type='text/css' href="../src/style/gb-style.css">
    <link rel="stylesheet" type='text/css' href="../src/style/photographer-style.css">
</head>

<body>

<?php
$string = strtolower($_SERVER['HTTP_USER_AGENT']);
$pattern = "(/(google|bot|yahoo|baidu|facebook|embedly|quora|outbrain|pinterest|vk|w3c|app|flipboard|tumblr|skype|nuzzel|qwantify)/gi)";

if (preg_match($pattern, $string)) {
    ?>
    <div class='gb-app-wrapper'>

        <!-- Nav start -->
        <div class="gb-navbar gb-background-transparent">
            <div class="left-content">
                <a class='nav-logo' href="#">
                    <svg class="gb-icon-medium gb-icon-fill-white" id="gb-logo-small" viewBox="0 0 50 51">
                        <title>gb-logo-small</title>
                        <path d="M44.4261 18.0367L44.8645 18.3499H45.3029V17.5356L46.6181 17.4104L47.8707 18.3499H49.8748L50 18.2246C49.8121 17.5358 49.5616 16.8468 49.3111 16.2206H47.9959L47.307 15.469L47.1818 14.2791L46.4929 14.6548L46.1171 16.0952L45.1151 15.0306L45.0524 14.0286L44.113 13.2144L43.7372 12.8386H42.6725L43.0483 13.8407L44.3635 14.5922L44.614 14.8428L44.3009 15.0306V15.7821L43.6746 16.0326L43.111 15.9073L42.7978 15.4064L43.6746 15.469L43.9251 15.1559L41.921 13.8407L41.7958 13.277L40.9816 14.0286L40.1675 13.8407L38.9149 15.469L38.6644 16.0952L37.8502 16.158H36.6603L35.9714 15.8447L35.7835 14.4669L36.0341 13.7781L37.2239 13.5276L38.5391 13.7781L38.7271 13.0265L38.1634 12.9012L38.3513 11.7739L39.6664 11.5861L40.6058 10.2709L41.5453 10.083L42.4221 10.2083H42.7352L42.5473 9.01831L41.4827 9.45679L41.1069 8.57996L40.4806 8.51733L40.3553 7.89111L40.8564 7.32739L42.0463 6.88904L42.3594 6.32544C37.9128 2.37988 32.0259 0 25.6379 0C20.064 0 14.9286 1.81616 10.7325 4.82227H11.985L12.5487 5.1355L13.6134 5.38599L13.676 5.82434L15.3669 5.88696L15.1165 5.32336L13.6134 5.26074L13.9891 4.94763L13.8639 4.57178H12.4861L13.9891 3.44446H15.4296L16.1185 4.38391L17.2458 4.44653L17.9347 3.82031L18.4357 4.0708L17.4963 4.94763H16.3064C16.369 4.94763 16.4316 5.82434 16.4316 5.82434L17.9973 5.76172L18.1852 5.32336L19.2499 5.26074L19.3751 4.6344L18.7488 4.50916L18.9367 3.94556L19.4377 3.82031L21.1287 3.88293L20.1893 4.69702L20.3145 5.32336L21.254 5.44861L21.1913 4.25867L22.1307 3.75769L23.759 3.56982L26.1389 4.6344V5.51123L26.8904 5.6991L26.5146 6.38806H25.5126L25.1995 7.20215L22.757 6.63855L24.6985 5.63647L23.9469 5.01025L22.256 5.19812L22.1307 5.32336V5.38599L21.6297 5.88696L20.8156 5.94958L20.8782 6.32544L21.1287 6.45068V6.57593L20.5024 6.63855L20.4398 7.01428L19.8135 7.0769L19.6882 6.32544L18.6236 6.88904L16.369 8.20422L16.6195 9.14368L17.2458 9.58203L18.4984 9.7699V11.2103L19.062 11.0851L19.6256 9.95776L20.9408 9.51941V7.82849L21.6923 7.26477L23.5085 7.70312L23.3833 8.83044H23.8843L25.1995 8.20422L25.2621 9.70728L26.2015 10.2709L26.1389 11.1477L25.1995 11.4608L25.2621 11.7739L26.3894 12.275V12.9012H26.0763L24.6985 12.4629L24.6358 12.0245L25.0742 11.7113V11.2729L24.6358 11.1477L24.5106 11.5234L23.759 11.6487H23.6964V11.7113L23.4459 11.7739L23.1954 11.3356L22.9449 11.2103H22.3812L22.1307 11.3982V11.8365L22.6318 12.0245L23.0701 12.0872L22.9449 12.1498L22.5065 12.6508L22.3186 12.4003L21.8802 12.275L20.7529 13.3397L20.8782 13.465L19.2499 14.4043L17.6842 16.0326L17.5589 16.7842L15.9932 17.7863L15.2417 18.5377L15.3043 20.1034L14.2397 19.6024V18.663H11.2335L9.66785 19.4146L8.97894 20.6671L8.72845 21.6691L9.16681 22.6085L10.3568 22.7338L12.2982 21.4186L12.4861 22.0449L11.9224 23.1722L13.4255 23.4227L13.5508 25.6772L15.5549 25.9905L16.87 24.4873L18.4357 24.8005L18.9993 25.552L20.5024 25.4894L20.5651 25.051L21.3792 25.4268L22.3186 26.8672H23.9469L24.5106 27.8693L24.5732 29.1218L26.3268 29.8107H28.5814L29.2076 30.8754L30.2097 31.1885L30.0218 32.0653L28.9572 33.4431L28.644 36.5118L27.642 37.2634L26.2015 37.2008L25.7005 38.0149L26.0763 39.5806L24.5106 41.5847L24.0096 42.524L22.5065 43.2756L21.5045 43.4009L21.4418 43.8392L22.1307 44.0271L22.0681 44.4656L21.4418 45.0918L21.8176 45.5928H22.5692L22.5065 46.1565L22.3186 46.7201L22.256 47.1586L23.3833 48.0979L23.2581 48.599H21.7549L20.2519 47.2838L19.062 45.217L19.2499 43.213L18.3731 42.0231L18.7488 40.019L18.2478 39.8937V35.5724C18.2478 35.5724 16.7448 34.4452 16.6821 34.4452C16.6195 34.4452 15.9306 34.2572 15.9306 34.2572L15.8054 33.4431L13.8639 31.0632L14.0518 30.1865L14.1144 28.7461L15.4296 27.8066L15.2417 26.241L13.3002 26.1157L11.7972 24.3621L10.7325 24.049L10.0436 23.9237L10.1063 23.2975L9.22949 23.1722V23.548L7.03748 22.9843L6.16071 21.6064L6.5365 20.9176L5.15869 18.8508L4.90814 17.3478H4.34454L4.53241 18.7882L5.4718 20.2913L5.34656 20.855L4.53241 20.7297L3.53033 18.9762V16.972L2.4657 16.4711V15.0306C1.15051 18.0994 0.461609 21.4186 0.461609 24.9258C0.461609 38.8917 11.7972 50.2273 25.7631 50.2273C33.6542 50.2273 40.7311 46.5948 45.4282 40.8331H44.614V39.1422L43.6746 37.827V36.324L42.9231 35.5724L42.8605 34.7583L43.7999 32.9421L42.0463 29.8107L42.2342 27.6814L40.6058 27.4935L40.0422 26.9298H38.9775L38.4139 27.4309H36.535L36.4724 27.6188H35.4078L32.9653 24.8632V22.7338L33.3411 22.6085L33.4663 21.7944H32.9026L32.6522 20.9176L35.4704 18.9135V17.473L36.8482 16.7216L37.4119 16.7842H38.5391L39.416 16.2832L42.2342 16.0326V17.473L44.4261 18.0367ZM37.5371 8.64258L38.3513 8.45471L38.5392 9.45679L38.9775 10.1456L39.2907 10.4587L39.8544 10.6467L39.3533 11.2729L38.3513 11.3982H37.5997L37.6624 10.5214L38.2886 10.3961L38.226 9.95776L37.6624 9.58203L37.2866 9.33154V9.01831L37.5371 8.64258ZM36.4725 9.7699L35.9714 10.5841V11.0851H36.5351L37.5997 10.3336L37.6624 9.7699L37.1614 9.58203L36.4725 9.7699ZM22.1934 13.7153L21.6923 13.778V13.4022L21.9428 13.0891L22.256 13.3396L22.1934 13.7153ZM23.6338 13.0265H24.0096L24.1974 12.776L23.8843 12.7134H23.5712L23.4459 13.0891H22.6944V13.465H22.8823V13.6528L23.3207 13.5902L23.5712 13.4022L23.6338 13.0265Z"></path>
                    </svg>
                </a>
            </div>
            <div class='center-content'>
            </div>
            <div class="right-content">
                <a href="sign-in.php" class='gb-text-capitalize gb-text-white gb-paragraph-memdium'>sign in</a>
            </div>
        </div>
        <!-- Nav end-->

        <!-- Photographer -->
        <div class="gb-card-50-skewed"
             style='background-image: url("https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11be05062d1f7ba80ca7d217e0aa241f&auto=format&fit=crop&w=1049&q=80");'>
            <div class="without-extend">
                <div class="blackoverlay"></div>
                <div class="inner-content">
                    <p class="gb-text-white gb-title-large card-for">Photographers</p>
                    <p class="gb-text-white gb-paragraph-large about-type">Find the job that suits you and get the job
                        done.</p>
                    <div id="photographer-arrow-down" class="arrow-down gb-icon-large">
                        <svg id="email" viewBox="0 0 24 24" width="100%" height="100%"
                             class="gb-icon-fill-white gb-icon-large card-50-skewed-arrow"><title>arrow down</title>
                            <path d="M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <!-- modal -->
            <div class="modal" style="display: none;">
                <ul class="modal-list">
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 20 20"
                             width="100%" height="100%">
                            <title>search2</title>
                            <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">Search for the best jobs
                            oportunities in your area of interests.</p>
                    </li>
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 24 24"
                             width="100%" height="100%"><title>done</title>
                            <path d="M9 16.219l10.594-10.641 1.406 1.406-12 12-5.578-5.578 1.359-1.406z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">Apply for the jobs that
                            you
                            are interested in.</p>
                    </li>
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 32 32"
                             width="100%" height="100%"><title>creditcard</title>
                            <path d="M30 4h-28c-1.104 0-2 0.896-2 2v20c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2v-20c0-1.104-0.896-2-2-2zM3 6h26c0.553 0 1 0.447 1 1v3h-28v-3c0-0.553 0.447-1 1-1zM29 26h-26c-0.553 0-1-0.447-1-1v-9h28v9c0 0.553-0.447 1-1 1z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">Do the job, get the
                            money
                            fast and secured.</p>
                    </li>
                </ul>
                <a class="modal-button gb-btn gb-btn-white gb-btn-small" href="sign-up.php?type=photographer">Join
                    Now</a></div>
        </div>

        <!-- Company -->
        <div class="gb-card-50-skewed"
             style='background-image: url("https://images.unsplash.com/photo-1523871762770-87bda6d9ab58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=651c083bb21d6ff0ef6eaa4136cbef56&auto=format&fit=crop&w=1185&q=80");'>
            <div class="without-extend">
                <div class="blackoverlay"></div>
                <div class="inner-content">
                    <p class="gb-text-white gb-title-large card-for">Companies</p>
                    <p class="gb-text-white gb-paragraph-large about-type">Find the photographer that suits you and get
                        the
                        job
                        done</p>
                    <div id="company-arrow-down" class="arrow-down gb-icon-large">
                        <svg id="email" viewBox="0 0 24 24" width="100%" height="100%"
                             class="gb-icon-fill-white gb-icon-large card-50-skewed-arrow"><title>arrow down</title>
                            <path d="M7.406 7.828l4.594 4.594 4.594-4.594 1.406 1.406-6 6-6-6z"></path>
                        </svg>
                    </div>
                </div>
            </div>
            <!-- modal -->
            <div class="modal" style="display: none;">
                <ul class="modal-list">
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 20 20"
                             width="100%" height="100%">
                            <title>search2</title>
                            <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">Search for the best
                            photographer in your area, or post a public job.</p>
                    </li>
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 24 24"
                             width="100%" height="100%">
                            <title>done</title>
                            <path d="M9 16.219l10.594-10.641 1.406 1.406-12 12-5.578-5.578 1.359-1.406z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">Sign the contract
                            with the
                            chosen photographer.</p>
                    </li>
                    <li class="modal-list-item">
                        <svg class="modal-icon gb-icon-fill-white gb-icon-medium" id="facebook" viewBox="0 0 32 32"
                             width="100%" height="100%">
                            <title>creditcard</title>
                            <path d="M30 4h-28c-1.104 0-2 0.896-2 2v20c0 1.104 0.896 2 2 2h28c1.104 0 2-0.896 2-2v-20c0-1.104-0.896-2-2-2zM3 6h26c0.553 0 1 0.447 1 1v3h-28v-3c0-0.553 0.447-1 1-1zM29 26h-26c-0.553 0-1-0.447-1-1v-9h28v9c0 0.553-0.447 1-1 1z"></path>
                        </svg>
                        <p class="gb-text-white gb-paragraph-small modal-list-item-description">After the job is
                            done, pay
                            fast and secured.</p>
                    </li>
                </ul>
                <a class="modal-button gb-btn gb-btn-white gb-btn-small" href="sign-up.php?type=company">Get Started</a>
            </div>
        </div>

        <!-- Footer -->
        <div class="gb-footer gb-background-black-opacity-5">
            <div class="footer-wrapper">
                <ul class="footer-nav"></ul>
                <ul class="footer-social-media-list">
                    <li class="footer-social-media-item"><a href="/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" id="instagram" viewBox="0 0 20 20"
                                 width="100%" height="100%"><title>instagram</title>
                                <path d="M17 1h-14c-1.1 0-2 0.9-2 2v14c0 1.101 0.9 2 2 2h14c1.1 0 2-0.899 2-2v-14c0-1.1-0.9-2-2-2zM9.984 15.523c3.059 0 5.538-2.481 5.538-5.539 0-0.338-0.043-0.664-0.103-0.984h1.581v7.216c0 0.382-0.31 0.69-0.693 0.69h-12.614c-0.383 0-0.693-0.308-0.693-0.69v-7.216h1.549c-0.061 0.32-0.104 0.646-0.104 0.984 0 3.059 2.481 5.539 5.539 5.539zM6.523 9.984c0-1.912 1.55-3.461 3.462-3.461s3.462 1.549 3.462 3.461-1.551 3.462-3.462 3.462c-1.913 0-3.462-1.55-3.462-3.462zM16.307 6h-1.615c-0.382 0-0.692-0.312-0.692-0.692v-1.617c0-0.382 0.31-0.691 0.691-0.691h1.615c0.384 0 0.694 0.309 0.694 0.691v1.616c0 0.381-0.31 0.693-0.693 0.693z"></path>
                            </svg>
                        </a></li>
                    <li class="footer-social-media-item"><a href="/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" id="twitter" viewBox="0 0 16 16"
                                 width="100%" height="100%"><title>twitter</title>
                                <path d="M16 3.538c-0.588 0.263-1.222 0.438-1.884 0.516 0.678-0.406 1.197-1.050 1.444-1.816-0.634 0.375-1.338 0.65-2.084 0.797-0.6-0.638-1.453-1.034-2.397-1.034-1.813 0-3.281 1.469-3.281 3.281 0 0.256 0.028 0.506 0.084 0.747-2.728-0.138-5.147-1.444-6.766-3.431-0.281 0.484-0.444 1.050-0.444 1.65 0 1.138 0.578 2.144 1.459 2.731-0.538-0.016-1.044-0.166-1.488-0.409 0 0.013 0 0.028 0 0.041 0 1.591 1.131 2.919 2.634 3.219-0.275 0.075-0.566 0.116-0.866 0.116-0.212 0-0.416-0.022-0.619-0.059 0.419 1.303 1.631 2.253 3.066 2.281-1.125 0.881-2.538 1.406-4.078 1.406-0.266 0-0.525-0.016-0.784-0.047 1.456 0.934 3.181 1.475 5.034 1.475 6.037 0 9.341-5.003 9.341-9.341 0-0.144-0.003-0.284-0.009-0.425 0.641-0.459 1.197-1.038 1.637-1.697z"></path>
                            </svg>
                        </a></li>
                    <li class="footer-social-media-item"><a href="/">
                            <svg class="gb-icon-fill-black-opacity-30 gb-icon-small" id="facebook" viewBox="0 0 16 16"
                                 width="100%" height="100%"><title>facebook</title>
                                <path d="M14.5 0h-13c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h6.5v-7h-2v-2h2v-1c0-1.653 1.347-3 3-3h2v2h-2c-0.55 0-1 0.45-1 1v1h3l-0.5 2h-2.5v7h4.5c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5z"></path>
                            </svg>
                        </a></li>
                </ul>
                <div class="footer-rights-reserved"><p class="gb-label gb-text-black-opacity-30">© 2018 All rights
                        reserved.</p></div>
            </div>
        </div>
    </div>
    <script type='text/javascript' src='scripts/home.js'></script>
    <script type='text/javascript' src='scripts/navbar.js'></script>
    <?php
} else {
    include_once("index.html");
}
?>

</body>

</html>