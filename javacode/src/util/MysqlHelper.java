package util;



import java.util.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class MysqlHelper {
	private  static String UserAccount = "root";
	private  static String PassWord = "123456";
	private  static String Url = "jdbc:mysql://localhost:3306/book?"
								 + "characterEncoding=utf-8&serverTimezone=GMT%2B8";
	
	private static Connection conn = null;
//	private static PreparedStatement prep = null;
//	private static ResultSet re = null;
	public static void setURL(String port,String databaseName) {
		Url="jdbc:mysql://localhost:"+port+"/"+databaseName+"?characterEncoding=utf-8&serverTimezone=GMT%2B8";
	}
	
	static {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	private MysqlHelper() {
		
	}
	
	private static void getConn() {
		try {
			conn = DriverManager.getConnection(Url, UserAccount, PassWord);
		} catch (SQLException e) {
			
			System.out.println("¡¥Ω” ß∞‹");
			e.printStackTrace();
		}
	}
	
	public static void setPassWord(String passWord) {
		PassWord = passWord;
	}

	public static void setConn(Connection conn) {
		MysqlHelper.conn = conn;
	}

	public static boolean addValueToTable(String tablename,
						  ArrayList<String> collist, ArrayList<String> valuelist) {
		String sql = "insert into "+tablename+" ";
		String cols = fixcols(collist);
		String values = fixvalue(valuelist);
		sql = sql+cols+values;
		getConn();
		PreparedStatement prep = null;
		int re = 0;
		try {
			prep = conn.prepareStatement(sql);
			re = prep.executeUpdate();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}finally {
			try {
				if(prep!=null)
					prep.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			close();
		}
		System.out.println(sql);
		return re>0 ? true:false;
	}
	public static ArrayList<HashMap<String,String>> getValueFromTable(String tableName,
			String key,String keyValue){
		String sql = "select * from "+tableName+" where "+key+"= '"+keyValue+"'";
		return selectValue(sql);
	}
	public static ArrayList<HashMap<String,String>> getValueFromTable(String tableName){
		String sql = "select * from "+tableName;
		return selectValue(sql);
	}
	private static ArrayList<HashMap<String,String>> selectValue(String sql){
		
		System.out.println(sql);
		PreparedStatement prep = null;
		ResultSet re = null;
		ArrayList<HashMap<String,String>> l = new ArrayList<>();
		getConn();
		try {
			prep = conn.prepareStatement(sql);
			re = prep.executeQuery();
			ResultSetMetaData d = re.getMetaData();
			while(re.next()) {
				HashMap<String,String> map = new HashMap<>();
				for(int i=0;i<=d.getColumnCount();i++) {
					String name = d.getColumnName(i);
					map.put(name, re.getString(i));
				}
				l.add(map);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}finally {
			try {
				if(re !=null)
					re.close();
				if(prep != null)
					prep.close();
				close();
			}catch(SQLException e) {
				e.printStackTrace();
			}
		}
		return l;
	}
	
	public static boolean updateValue(String tablename,
			String key,String keyvalue,
			String updatekey,String updatevalue) {
		ArrayList<String> collist = new ArrayList<>();
		ArrayList<String> valuelist = new ArrayList<>();
		collist.add(updatekey);
		valuelist.add(updatevalue);
		return updateValue(tablename,key,keyvalue,collist,valuelist);
	}
	public static boolean updateValue(String tablename,String key,String keyvalue,
			ArrayList<String> collist,ArrayList<String> valuelist) {
		String sql = "update "+tablename+" set ";
		String sub = "";
		for(int i=0;i<collist.size();i++) {
			sub+=collist.get(i)+"='"+valuelist.get(i)+"'";
			if(i != collist.size()-1)
				sub+=",";
		}
		sub+=" where "+key+"='"+keyvalue+"'";
		sql+=sub;
		System.out.println(sql);
		getConn();
		PreparedStatement prep = null;
		int re = 0;
		try {
			prep = conn.prepareStatement(sql);
			re = prep.executeUpdate();
		} catch (SQLException e) {
			
			e.printStackTrace();
		}finally {
			try {
				if(prep != null)
					prep.close();
			} catch (SQLException e) {
				
				e.printStackTrace();
			}
			close();
		}
		return re>0 ? true:false;
	}
	private static String fixcols(ArrayList<String> collist) {
		String cols = "(";
		for(int i = 0;i<collist.size();i++) {
			cols += collist.get(i);
			
			if(i != collist.size()-1) {
				cols += ",";
			}
		}
		cols += ")";
		
		return cols;
	}
	private static String fixvalue(ArrayList<String> valuelist) {
		String value = "values (";
		for(int i = 0;i<valuelist.size();i++) {
			value += valuelist.get(i);
			
			if(i != valuelist.size()-1) {
				value += ",";
			}
		}
		value += ")";
		
		return value;
	}
	
	public static void close() {
		try {
			if(conn != null && conn.isClosed())conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
 