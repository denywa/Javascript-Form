// Memilih semua elemen input dan select pada dokumen
var inputan = document.querySelectorAll("input, select");

// Mengatur semua elemen input dan select yang dipilih menjadi wajib diisi
for (var i = 0; i < inputan.length; i++) {
  inputan[i].required = true;
}

// Menambahkan event listener untuk form dengan id "regis" pada saat submit
document.getElementById("regis").addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah form dari submit secara default

  // Mengambil data dari form
  var formData = new FormData(this);

  // Membuat objek untuk menyimpan data form yang telah diserialisasi
  var formDataSerialized = {};

  // Mengisi objek dengan data form, menggunakan nama input sebagai kunci
  for (var [key, value] of formData.entries()) {
    if (key === "Phone Number") {
      var countryCode = document.getElementById("country-code").value;
      formDataSerialized[key] = countryCode + value;
    } else {
      formDataSerialized[key] = value;
    }
  }
  console.log(formDataSerialized);

  // Membuat tabel responsif untuk menampilkan output
  var table = "<div class='table-responsive'><table class='table'; width: 100%;'><tbody>";
  for (var key in formDataSerialized) {
    if (key === "Image") {
      var imageFile = formData.get("Image"); // Mengambil file gambar dari FormData
      if (imageFile && imageFile.name) {
        var imageUrl = URL.createObjectURL(imageFile); // Membuat URL untuk file gambar
        table += "<tr><td>" + key + "</td><td>:</td><td><img src='" + imageUrl + "' style='max-width: 120px; max-height: 120px;' /></td></tr>";
      } else {
        table += "<tr><td>" + key + "</td><td>:</td><td>No image selected</td></tr>";
      }
    } else {
      table += "<tr><td>" + key + "</td><td>:</td><td>" + formDataSerialized[key] + "</td></tr>";
    }
  }
  
  table += "</tbody></table></div>";
  // Menampilkan output di div output
  document.getElementById("displayDiv").innerHTML = table;
  // Menampilkan div dengan id 'outputDiv' dengan mengubah style display menjadi 'block'
  document.getElementById("outputDiv").style.display = "block";
});

// Fungsi untuk memeriksa jenis file gambar yang diunggah
function checkImage() {
  // Membuat variabel yang mengambil jenis file dari input file
  var inputImageType = document.querySelector("input[type=file]").files[0].type;

  // Menentukan jenis file gambar yang valid
  const valids = ["image/jpeg", "image/png"];

  // Jika jenis file tidak valid, maka akan memunculkan alert dan mengosongkan nilai input file
  if (!valids.includes(inputImageType)) {
    alert("Silakan masukkan hanya gambar");
    document.querySelector("input[type=file]").value = "";
  }
}
// Mengatur tanggal maksimum pada input tanggal lahir menjadi hari ini
document.getElementById("birth-date").setAttribute("max", new Date().toISOString().split("T")[0]);
