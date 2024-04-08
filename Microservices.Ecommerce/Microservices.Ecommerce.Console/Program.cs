// See https://aka.ms/new-console-template for more information
using System.Security.Cryptography;
using System.Text;

string keyDirectorypath = Path.Combine(Directory.GetCurrentDirectory(), "keys");

if (!Directory.Exists(keyDirectorypath))
{
    Directory.CreateDirectory(keyDirectorypath);
}

var rsa = RSA.Create(2048);

string privateKey = rsa.ToXmlString(true);
string publicKey = rsa.ToXmlString(false);

using var privateKeyFile = File.Create(Path.Combine(keyDirectorypath, "private.xml"));
privateKeyFile.Write( Encoding.UTF8.GetBytes(privateKey));
privateKeyFile.Close();

using var publicKeyFile = File.Create(Path.Combine(keyDirectorypath, "public.xml"));
publicKeyFile.Write(Encoding.UTF8.GetBytes(publicKey));
publicKeyFile.Close();