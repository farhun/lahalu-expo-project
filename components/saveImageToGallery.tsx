import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export async function saveImageToGallery(url: string): Promise<void> {
  try {
    // Request media library permissions (handled by expo-media-library)
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Download the image to the file system
    const fileUri = FileSystem.documentDirectory + 'image.jpg'; // Create a local file path
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      fileUri
    );
    const { uri } = await downloadResumable.downloadAsync();

    // Save the file to the media library
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('Download', asset, false);

    alert('Image saved to gallery!');
  } catch (error) {
    console.error('Error saving image:', error);
    alert('Failed to save image.');
  }
}
