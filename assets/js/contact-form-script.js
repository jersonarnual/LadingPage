function enviarCorreo() {
    var destinatario = "jerson8moreno@gmail.com";
    var asunto = "Info Nuevo Cliente CubeLab";
    var name = $("#name").val()??"";
    var email = $("#email").val()??"";
    var phone_number = $("#phone_number").val()??"";
    var subject = $("#subject").val()??"";
    var message = $("#message").val()??"";
    var mensaje = `${name} ${email} ${phone_number} ${subject} ${message}`;


    // Autenticación con la API de Google
    gapi.auth.authorize(
      {
        client_id: "TU_CLIENT_ID.apps.googleusercontent.com",
        scope: "https://www.googleapis.com/auth/gmail.compose",
        immediate: true
      },
      function() {
        // Llamada a la API de Gmail
        gapi.client.load("gmail", "v1", function() {
          var base64EncodedEmail = btoa(
            'Content-Type: text/plain; charset="UTF-8"\n' +
              "MIME-Version: 1.0\n" +
              "Content-Transfer-Encoding: 7bit\n" +
              "to: " +
              destinatario +
              "\n" +
              "subject: " +
              asunto +
              "\n\n" +
              mensaje
          )
            .replace(/\+/g, "-")
            .replace(/\//g, "_");

          var request = gapi.client.gmail.users.messages.send({
            userId: "me",
            resource: {
              raw: base64EncodedEmail
            }
          });

          request.execute(function() {
            console.log("Correo enviado correctamente");
          });
        });
      }
    );
  }