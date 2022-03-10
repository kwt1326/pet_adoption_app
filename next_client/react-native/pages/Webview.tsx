import React, { createRef, useCallback } from 'react';
import { Alert, NativeSyntheticEvent, Platform } from 'react-native';
import { FileDownload, WebView } from 'react-native-webview';
import { WebViewMessage } from 'react-native-webview/lib/WebViewTypes';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { webViewUri } from '../config';

function MainWebView() {
  let webViewRef = createRef<WebView>();
  const { getItem, setItem, removeItem } = useAsyncStorage('cookie');

  const saveToken = useCallback(
    async (data: string) => {
      setItem(data);
    },
    [setItem],
  );

  const onFileDownload = ({ nativeEvent }: { nativeEvent: FileDownload }) => {
    Alert.alert('File download detected', nativeEvent.downloadUrl); // TODO: REMOVE
  };

  const _onMessage = async (event: NativeSyntheticEvent<WebViewMessage>) => {
    const { data } = event.nativeEvent;
    await saveToken(data);
    // const items = await getItem();
    // if (items) {
    //   console.log('TEST', JSON.parse(items));
    // }
  };

  const platformProps = Platform.select({
    ios: {
      onFileDownload: onFileDownload,
    },
  });

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: webViewUri }}
      automaticallyAdjustContentInsets={true}
      onMessage={_onMessage}
      {...platformProps}
    />
  );
}

export default MainWebView;
