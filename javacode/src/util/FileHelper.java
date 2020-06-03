package util;

import java.io.*;
import java.util.*;

public class FileHelper {
	
	public static final String charset = "utf-8";
	
	
	public static void fileCreator(String path,String content) {
		//默认在文件的尾部追加
		fileCreator(path,content,true);
	}
	public static void fileCreator(String path,String content,boolean append) {
		File f = new File(path);
		try {
			
			BufferedOutputStream b = new BufferedOutputStream(new FileOutputStream(f, append));
			b.write(content.getBytes(charset));
			b.close();
		} catch (Exception e) {
			
			e.printStackTrace();
		}
	}
	public static String binaryFileReader(String path) {
		String re = null;
		byte[] l = new byte[20];
		int index = 0;
		try {
			BufferedInputStream bis = new BufferedInputStream(new FileInputStream(path));
			byte b;
			while((b = (byte) bis.read()) != -1) {
				l[index] = b;
				index++;
				if(index>=l.length) {
					int oldCapacity = l.length;
					int newCapacity = oldCapacity + ((oldCapacity < 64) ?
                            (oldCapacity + 2) :
                            (oldCapacity >> 1));
					l = Arrays.copyOf(l, newCapacity);
				}
			}
			
			re = new String(l,charset);
			bis.close();
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return re;
	}
}
