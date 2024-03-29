import React from "react";
import { useState,useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const ReporteSemanal = ({informeSemanal, actividadesObtenidas, gananciaPorProyecto}) => {

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: 30,
    },
    div: {
      marginBottom: 10,
    },
    div2: {
      marginBottom: 20,
    },
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    h4: {
      fontSize: 16,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 10,
    },
    tr: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    td: {
      flex: 1,
      padding: 8,
      fontSize: 12,
    },
    table2: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 20,
    },
    thead: {
      backgroundColor: '#f2f2f2',
    },
    th: {
      flex: 1,
      padding: 10,
      fontWeight: 'bold',
      fontSize: 12,
    },
    tbody: {
      borderBottomWidth: 1,
      borderColor: '#ddd',
    },
    divfirma: {
      marginTop: 20,
    },
    h3: {
      fontSize: 18,
      marginBottom: 10,
    },
  });


  return (
    <Document>
    <Page style={styles.page} size="A4" orientation="landscape" >
     <View style={styles.div}>
      <View style={styles.div2}>
        <Text style={styles.h1}>Reporte Semanal</Text>
        <View style={styles.div} >
          <Text style={styles.h4} >Fecha: 
          {informeSemanal.rango_fechas.inicio} / {informeSemanal.rango_fechas.fin}
          </Text>
        </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.td}>Nombre:{informeSemanal.usuario.nombre} {informeSemanal.usuario.apellido}</Text>
            <Text style={styles.td}>Empresa: {informeSemanal.usuario.empresa ? informeSemanal.usuario.empresa : 'No tiene'}</Text>
            </View>
            <View style={styles.tr}>
            <Text style={styles.td}>Correo: {informeSemanal.usuario.email}</Text>
            <Text style={styles.td}>Departamento {informeSemanal.usuario.departamento ? informeSemanal.usuario.departamento : 'No tiene'}</Text>
            </View>
            <View style={styles.tr}>
            <Text style={styles.td}>Telefono: {informeSemanal.usuario.num_tel ? informeSemanal.usuario.num_tel : 'No tiene'}</Text>
            <Text style={styles.td}>Cargo: {informeSemanal.usuario.cargo ? informeSemanal.usuario.cargo : 'No tiene'}</Text>
          </View>
        </View>
        {/* Crear otra tabla que contenga las actividades */}
        <View style={styles.table2}>
          <View style={styles.thead}>
          <View style={styles.tr}>
            <Text style={styles.th}>Actividad</Text>
            <Text style={styles.th}>Horas</Text>
            <Text style={styles.th}>Tarifa</Text>
            <Text style={styles.th}>Ganancia</Text>
            <Text style={styles.th}>Proyecto</Text>
            <Text style={styles.th}>Cliente</Text>
            </View>
          </View>
          <View style={styles.tbody}>
            {/* Ciclo que recorra actividades */}
            {actividadesObtenidas.map((actividad) => (
            <View style={styles.tr} key={actividad.id_actividad}>
              <Text style={styles.td}>{actividad.nombre_actividad}</Text>
              <Text style={styles.td}>{actividad.duracion_total.horas.toString().padStart(2, '0')} : {actividad.duracion_total.minutos.toString().padStart(2, '0')}h</Text>
              <Text style={styles.td}>{actividad.tarifa}$</Text>
              <Text style={styles.td}>{actividad.total_tarifa}$</Text>
              <Text style={styles.td}>{actividad.nombre_proyecto}</Text>
              <Text style={styles.td}>{actividad.nombre_cliente}</Text>
            </View>
            ))}
          </View>
        </View>
        {/* Ganancia por proyecto */}
        <View style={styles.table}>
          <View style={styles.thead}>
          <View style={styles.tr}>
            <Text style={styles.th}>Ganancia por Proyecto</Text>
            <Text style={styles.th}>Descripcion del Proyecto</Text>
            </View>
          </View>
          <View style={styles.tbody}>
            {/* Ciclo que recorra actividades */}
            {gananciaPorProyecto.map((ganancia) => (
            <View style={styles.tr} key={ganancia.id_proyecto}>
              <Text style={styles.td}>{ganancia.proyecto}: {ganancia.gananciaTotal}$ </Text>
              <Text style={styles.td}>{ganancia.descripcion}</Text>
            </View>
            ))}
          </View>
        </View>
        {/* Total de Horas y Ganancia y pie de pagina */}
        <View style={styles.table}>
          <View style={styles.thead}>
          <View style={styles.tr}>
            <Text style={styles.th}>Total de Horas</Text>
            <Text style={styles.th}>Total de Ganancia</Text>
            <Text style={styles.th}>Total BCV</Text>
            </View>
            </View>
            <View style={styles.tbody}>
            <View style={styles.tr}>
              <Text style={styles.td}>{informeSemanal.duracion_total_informe.horas.toString().padStart(2, '0')} : {informeSemanal.duracion_total_informe.minutos.toString().padStart(2, '0')}h</Text>
              <Text style={styles.td}>{informeSemanal.ingresosTotales}$</Text>
              <Text style={styles.td}>{informeSemanal.ingresosTotalesbcv}bs</Text>
            </View>
          </View>
          </View>
          {/* Firma */}
          <View style={styles.divfirma}>
          <Text style={styles.h3}>{informeSemanal.usuario.nombre} {informeSemanal.usuario.apellido}</Text>
          <Text style={styles.h3}>Firma _____________________</Text>
        </View>
        </View>
    </Page>
  </Document>
  );
};

export default ReporteSemanal;
