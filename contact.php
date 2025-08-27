<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contact - Inciem</title>

  <!-- Google Fonts preconnects -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />

  <!-- Stylesheet -->
  <link rel="stylesheet" href="styles.css" />
</head>

<body class="contactpage">
  <nav>
    <div class="logo"></div>
    <ul id="menu">
      <div class="menu-header">
        <div class="logo"></div>
        <button class="close-menu" id="close-menu">✕</button>
      </div>
      <li><a href="#services">Services</a></li>
      <li><a href="#about">About Us</a></li>
      <li><a href="#products">Products</a></li>
      <li><a href="#portfolio">Portfolio</a></li>
      <li><a href="#careers">Careers</a></li>
    </ul>

    <div class="nav-actions">
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
        <span class="line line1"></span>
        <span class="line line2"></span>
        <span class="line line3"></span>
        <span class="line line4"></span>
      </button>

      <a href="contact.html" class="contact-button">Get in Touch</a>
    </div>
  </nav>

  <main class="background">
    <h1>Contact Us</h1>
    <div class="contact-links" role="navigation" aria-label="Breadcrumb navigation">
      <a href="index.php"><span>Home</span></a>
      <span aria-hidden="true">|</span>
      <a href="contact.php" aria-current="page"><span>Contact</span></a>
    </div>
  </main>

  <section>
    <div class="contact-container">
      <div class="contact-left">
        <h2>LET'S MAKE YOUR BRAND BRILLIANT!</h2>
        <p id="get-in-touch-para">
          If you would like to work with us or just want to get in touch, we’d
          love to hear from you!
        </p>
        <div class="contact-info">
          <section class="location">
            <h4>Kochi - India</h4>
            <address>
              2nd Floor, Infra Futura, Seaport – Airport Road,<br />
              Opp. BMC, Thrikkakara, Kakkanad,<br />
              Kochi, Kerala 682021
            </address>
            <p class="contact-detail">
              <strong>Phone:</strong> +91 9567700323
            </p>
            <p class="contact-detail">
              <strong>Email:</strong>
              <a href="mailto:info@inciem.com">info@inciem.com</a>
            </p>
            <p class="contact-detail">
              <strong>Sales Email:</strong>
              <a href="mailto:sales@inciem.com">sales@inciem.com</a>
            </p>
            <p class="contact-detail">
              <strong>Sales Phone:</strong> +91 9037411280
            </p>
          </section>

          <section class="location">
            <h4>UAE</h4>
            <address>
              Office No. 203<br />
              Sheikh Rashid Building<br />
              R133, Al Rigga Deira<br />
              Dubai, UAE
            </address>
            <p class="contact-detail">
              <strong>Phone:</strong> +971 55 455 8122
            </p>
            <p class="contact-detail">
              <strong>Email:</strong>
              <a href="mailto:info@inciem.com">info@inciem.com</a>
            </p>
            <p class="contact-detail">
              <strong>Sales Email:</strong>
              <a href="mailto:sales@inciem.com">sales@inciem.com</a>
            </p>
          </section>

          <section class="location">
            <h4>United Kingdom</h4>
            <address>
              66 Sandy Vale, Haywards Heath,<br />
              West Sussex,<br />
              United Kingdom<br />
              RH16 4JJ
            </address>
            <p class="contact-detail">
              <strong>Phone:</strong> +44 7832 985926
            </p>
            <p class="contact-detail">
              <strong>Email:</strong>
              <a href="mailto:info@inciem.com">info@inciem.com</a>
            </p>
            <p class="contact-detail">
              <strong>Sales Email:</strong>
              <a href="mailto:sales@inciem.com">sales@inciem.com</a>
            </p>
          </section>
        </div>
      </div>


      <div class="contact-right">
        <form id="contact-form" class="contact-form" novalidate method="post" action="">
          <h3>Send a Message</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="first_name"
                value="<?php echo isset($_POST['first_name']) ? htmlspecialchars($_POST['first_name']) : ''; ?>"
                required />
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="last_name"
                value="<?php echo isset($_POST['last_name']) ? htmlspecialchars($_POST['last_name']) : ''; ?>"
                required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email"
                value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>" required />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone"
                value="<?php echo isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : ''; ?>" />
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5"
              required><?php echo isset($_POST['message']) ? htmlspecialchars($_POST['message']) : ''; ?></textarea>
          </div>

          <button type="submit">Send</button>

          <div id="form-output" aria-live="polite" style="margin-top: 20px; font-weight: bold"></div>
        </form>
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          // Collect & sanitize inputs
          $first_name = trim($_POST['first_name']);
          $last_name = trim($_POST['last_name']);
          $email = trim($_POST['email']);
          $phone = trim($_POST['phone']);
          $message = trim($_POST['message']);

          //Array to hold errors
          $errors = [];

          // Validation checks
          if (empty($first_name)) {
            $errors[] = "First name is required.";
          }
          if (empty($last_name)) {
            $errors[] = "Last name is required.";
          }
          if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = "A valid email is required.";
          }
          if (empty($message)) {
            $errors[] = "Message cannot be empty.";
          }
          if (empty($phone)) {
            $errors[] = "Phone number cannot be empty.";
          } elseif (!preg_match('/^\+?[0-9]{7,15}$/', $phone)) {
            $errors[] = "Phone number must contain only digits (optional + at start) and be 7-15 characters long.";
          }

          if (!empty($errors)) {
            echo "<h3 style='color:red;'>Please fix the following errors:</h3>";
            echo "<ul style='color:red;margin:0;padding:0;'>";
            echo "<div style='display:flex; flex-direction:column;'>";
            foreach ($errors as $error) {
              echo "<p style='color:red;margin-bottom:10px;'>$error</p>";
            }
            echo "</ul>";
          } else {
            // echo "<h3 style='color:green;'>Thank you, $first_name $last_name!</h3>";
            // echo "<p>We received your message:</p>";
            // echo "<blockquote>$message</blockquote>";
            // echo "<p>We will reach out to you at <strong>$email</strong>";
            // if (!empty($phone)) {
            //   echo " or call you at <strong>$phone</strong>";
            // }
            // echo ".</p>";
            echo "<h3 style='color:green;'>Thank you, " . htmlspecialchars($first_name) . " " . htmlspecialchars($last_name) . "!</h3>";
            echo "<p>We received your message:</p>";
            echo "<blockquote>" . htmlspecialchars(string: $message) . "</blockquote>";
            echo "<p>We will reach out to you at <strong>" . htmlspecialchars($email) . "</strong>";
            echo " or call you at <strong>" . htmlspecialchars($phone) . "</strong>";
            echo ".</p>";
          }
          echo "</div>";
        }
        ?>
      </div>

    </div>

  </section>

  <script src="script.js"></script>
</body>

</html>