<?php
    $server = "idc1.ivc.edu idc2.ivc.edu idc3.vic.edu";
    $baseDN = "dc=ivc,dc=edu";
     
    $username = filter_input(INPUT_POST, 'username');
    $password = filter_input(INPUT_POST, 'password');
    $login = "IVCSTAFF\\".$username;
    $result = array();

    $ldapconn = ldap_connect($server);   
    if($ldapconn) {
        ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

        $ldapbind = ldap_bind($ldapconn, $login, $password);  
        if($ldapbind) {            
            $filter = "(&(objectClass=user)(objectCategory=person)(cn=".$username."))";
            $ladp_result = ldap_search($ldapconn, $baseDN, $filter);
            $data = ldap_get_entries($ldapconn, $ladp_result);

            if ($data != null) {
                if (array_key_exists('displayname', $data[0])) {
                    $name = $data[0]["displayname"][0];
                }
                if (array_key_exists('mail', $data[0])) {
                    $email = $data[0]["mail"][0];
                }
                if (array_key_exists('department', $data[0])) {
                    $depart = $data[0]["department"][0];
                }
                if (array_key_exists('telephonenumber', $data[0])) {
                    $phone = $data[0]["telephonenumber"][0];
                }
                if (array_key_exists('division', $data[0])) {
                    $division = $data[0]["division"][0];
                }
                if (array_key_exists('employeetype', $data[0])) {
                    $emptype = $data[0]["employeetype"][0];
                }
                $result = array($name, $email, $depart, $phone, $division, $emptype);
            }
        }  
        ldap_close($ldapconn);
    }
    echo json_encode($result);
