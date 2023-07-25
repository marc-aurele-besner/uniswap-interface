variant=$1
rm ./android/keystore-${variant}.jks 
echo "Please note that this will overwrite your .env file with the keystore details for $variant. If you want to sign another variant, please run this script again."
{
  op document get "keystore-${variant}" --output "./android/keystore-${variant}.jks" --vault Android && APP_ENV=$variant op inject -i ./android/.env.template -o ./android/.env
} || {
  echo "Run this script with the variant name as the first argument."
  echo "Make sure you have the 1Pass CLI installed and that you are logged in. More info: https://developer.1password.com/docs/cli/get-started#install"
}