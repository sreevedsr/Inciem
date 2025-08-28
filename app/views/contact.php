<?php

// Retrieve messages and old input from session
$errors = $_SESSION['errors'] ?? [];
$success = $_SESSION['success'] ?? '';
$old = $_SESSION['old_input'] ?? [];

// Clear session data
unset($_SESSION['errors'], $_SESSION['success'], $_SESSION['old_input']);
?>

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
  <link rel="stylesheet" href="assets/css/styles.css" />
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

      <a href="index.php?page=contact" class="contact-button">Get in Touch</a>
    </div>
  </nav>

  <main class="background">
    <h1>Contact Us</h1>
    <div class="contact-links" role="navigation" aria-label="Breadcrumb navigation">
      <a href="index.php?page=home"><span>Home</span></a>
      <span aria-hidden="true">|</span>
      <a href="index.php?page=contact" aria-current="page"><span>Contact</span></a>
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
        <form id="contact-form" class="contact-form" novalidate method="post" action="index.php?page=contact">
          <h3>Send a Message</h3>

          <div class="form-row">
            <div class="form-group">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="first_name"
                value="<?php echo htmlspecialchars($old['first_name'] ?? ''); ?>" required />
                <?php if (!empty($errors['first_name'])): ?>
                  <span style="color:red; font-size:0.9em;"><?= htmlspecialchars($errors['first_name']) ?></span>
                <?php endif; ?>
            </div>
            <div class="form-group">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="last_name"
                value="<?php echo htmlspecialchars($old['last_name'] ?? ''); ?>" required />
                <?php if (!empty($errors['last_name'])): ?>
              <span style="color:red; font-size:0.9em;"><?= htmlspecialchars($errors['last_name']) ?></span>
            <?php endif; ?>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($old['email'] ?? ''); ?>"
                required />
                <?php if (!empty($errors['email'])): ?>
              <span style="color:red; font-size:0.9em;"><?= htmlspecialchars($errors['email']) ?></span>
            <?php endif; ?>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value="<?php echo htmlspecialchars($old['phone'] ?? ''); ?>" />
              <?php if (!empty($errors['phone'])): ?>
              <span style="color:red; font-size:0.9em;"><?= htmlspecialchars($errors['phone']) ?></span>
            <?php endif; ?>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5"
              ><?php echo htmlspecialchars($old['message'] ?? ''); ?></textarea>
          </div>

          <button type="submit">Send</button>
        </form>

        <div class="contact-messages" style="display:flex; flex-direction:column; margin-top:20px;">

          <?php if (!empty($success)): ?>
            <p style="color:green;"><?php echo $success; ?></p>
          <?php endif; ?>
        </div>
      </div>

    </div>

  </section>

  <script src="assets/js/script.js"></script>
</body>

</html>